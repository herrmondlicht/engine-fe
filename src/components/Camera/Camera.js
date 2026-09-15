import React, { useRef, useEffect, useCallback } from "react";
import useSWR from "swr";
import { Button, BUTTON_VARIANTS, ScreenLoader } from "ui-fragments";
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

const Camera = ({ onCapture, onCancel, isLoading }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
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

  const handleTakePhoto = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) {
      return;
    }
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg");
    const base64Image = dataUrl.split(",")[1];
    if (onCapture) {
      onCapture(base64Image);
    }
  }, [onCapture]);

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
            onClick={onCancel}
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

export default Camera;
