import { useEffect, useState } from "react";
import { isMobile } from "@/utils/productUtils";

interface Coordinates {
  latitude: number | null;
  longitude: number | null;
}

const getGeolocation = async (): Promise<Coordinates> => {
  return await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            // alert(
            //   "위치 정보 제공을 거부했습니다. 현재 위치 근처의 당근마켓 제품을 확인하려면 브라우저 설정에서 위치 권한을 허용해 주세요.",
            // );
            reject(new Error("위치 정보 제공을 거부했습니다."));
            break;
          case error.POSITION_UNAVAILABLE:
            reject(new Error("위치 정보를 사용할 수 없습니다."));
            break;
          case error.TIMEOUT:
            reject(new Error("사용자 위치 요청이 시간 초과되었습니다."));
            break;
          default:
            reject(new Error("알 수 없는 오류가 발생했습니다."));
            break;
        }
      },
    );
  });
};

const useGeolocation = (): {
  location: Coordinates | null;
  error: string | null;
  loading: boolean;
  refresh: () => void;
} => {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isMobile()) {
      getGeolocation()
        .then((coords) => {
          setLocation(coords);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message as string);
          setLoading(false);
        });
    }
  }, []);

  const refresh = (): void => {
    setLoading(true);
    getGeolocation()
      .then((coords) => {
        setLocation(coords);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message as string);
        setLoading(false);
      });
  };

  return { location, error, loading, refresh };
};

export default useGeolocation;
