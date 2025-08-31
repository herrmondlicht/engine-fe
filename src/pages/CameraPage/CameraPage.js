import React, { useRef, useEffect, useCallback, useState } from "react";
import useSWR from "swr";
import { useHistory } from "react-router-dom";

import { Button, BUTTON_VARIANTS, ScreenLoader } from "ui-fragments";
import { engineAPI } from "utils";
import { useNotification } from "hooks";
import CameraIcon from "@heroicons/react/solid/CameraIcon";

const getCameraStream = async () => {
  if (!navigator.mediaDevices?.getUserMedia) {
    throw new Error("navigator.mediaDevices.getUserMedia não suportado");
  }
  return navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: "environment",
      width: { ideal: 1080 },
      height: { ideal: 1920 },
      aspectRatio: { ideal: 0.5625 }, // 9:16 aspect ratio
    },
  });
};

const CameraPage = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const history = useHistory();
  const { data: stream, error } = useSWR("cameraStream", getCameraStream);
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  }, [history, showErrorNotification, showSuccessNotification]);

  const handleCancel = useCallback(() => {
    console.log("handleCancel");
    history.replace("/");
  }, [history]);

  if (!stream && !error) {
    return <ScreenLoader isLoading={true} />;
  }

  return (
    <div className="fixed inset-0 bg-black z-50">
      {error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-error-0 text-center p-4 bg-white rounded-md">
            Não foi possível acessar a câmera do dispositivo.
          </p>
        </div>
      )}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <ScreenLoader isLoading={true} />
        </div>
      )}
      <div className="relative h-full">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
        <canvas ref={canvasRef} className="hidden" />

        <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center gap-4 bg-gradient-to-t from-black/50 to-transparent z-10">
          <Button
            variant={BUTTON_VARIANTS.ERROR}
            showVariantIcon={false}
            onClick={handleCancel}
            className="w-32"
          >
            Cancelar
          </Button>
          <Button
            variant={BUTTON_VARIANTS.PRIMARY}
            onClick={handleTakePhoto}
            className="w-32"
          >
            <span className="flex items-center gap-2">
              <CameraIcon className="h-5 w-5" />
              Tirar Foto
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CameraPage;
