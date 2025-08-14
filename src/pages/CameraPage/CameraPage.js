import React, { useRef, useEffect, useCallback } from "react";
import useSWR from "swr";
import { useHistory } from "react-router-dom";

import { PageTitle } from "components";
import { Card, Button, BUTTON_VARIANTS, ScreenLoader } from "ui-fragments";
import { engineAPI } from "utils";
import { useNotification } from "hooks";

const getCameraStream = async () => {
  if (!navigator.mediaDevices?.getUserMedia) {
    throw new Error("navigator.mediaDevices.getUserMedia não suportado");
  }
  return navigator.mediaDevices.getUserMedia({ video: true });
};

const CameraPage = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const history = useHistory();
  const { data: stream, error } = useSWR("cameraStream", getCameraStream);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const { showSuccessNotification, showErrorNotification } = useNotification();

  const handleTakePhoto = useCallback(async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) {
      return;
    }
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    try {
      const dataUrl = canvas.toDataURL("image/jpeg");
      const base64Image = dataUrl.split(",")[1];
      const { serviceOrder } = await engineAPI.service_order_images.post({
        data: { image: base64Image },
      });
      showSuccessNotification({
        id: "photoTaken",
        title: "Foto enviada!",
      });
      if (serviceOrder?.id) {
        history.push(`/services/${serviceOrder.id}`);
      }
    } catch (err) {
      showErrorNotification({
        id: "photoTakenError",
        title: "Não foi possível enviar a foto",
      });
    }
  }, [history, showErrorNotification, showSuccessNotification]);

  if (!stream && !error) {
    return <ScreenLoader isLoading={true} />;
  }

  return (
    <Card className="flex flex-col gap-4">
      <PageTitle title="Câmera" description="Tire uma foto da lista de peças" />
      {error && (
        <p className="text-error-0">
          Não foi possível acessar a câmera do dispositivo.
        </p>
      )}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full rounded-md"
      />
      <canvas ref={canvasRef} className="w-full rounded-md" />
      <Button variant={BUTTON_VARIANTS.PRIMARY} onClick={handleTakePhoto} fw>
        Tirar Foto
      </Button>
    </Card>
  );
};

export default CameraPage;
