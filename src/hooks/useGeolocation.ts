import { useEffect, useState } from "react";
import { isMobile } from "@/utils/productUtils";

interface Coordinates {
  latitude: number | null;
  longitude: number | null;
}

const GEOLOCATION_DENIED_KEY = "geolocationDenied";

const getGeolocation = async (): Promise<Coordinates> => {
  return await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        localStorage.removeItem(GEOLOCATION_DENIED_KEY);  // 권한이 허용된 경우 상태 제거
        resolve({ latitude, longitude });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert(
              "위치 정보 제공을 거부했습니다. 현재 위치 근처의 당근마켓 제품을 확인하려면 브라우저 설정에서 위치 권한을 허용해 주세요.",
            );
            localStorage.setItem(GEOLOCATION_DENIED_KEY, "true"); // 권한 거부 상태 저장
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
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      const checkPermission = async () => {
        try {
          const permissionState = await navigator.permissions.query({
            name: "geolocation",
          });

          if (permissionState.state === 'denied') {
            localStorage.setItem(GEOLOCATION_DENIED_KEY, 'true');
          } else {
            localStorage.removeItem(GEOLOCATION_DENIED_KEY);
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
        } catch (err) {
          console.error('Permission query error: ', err);
        }
      };

      void checkPermission();
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
