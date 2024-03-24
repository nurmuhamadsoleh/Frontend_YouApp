import "swiper/css";
import "swiper/css/pagination";
import "react-toastify/dist/ReactToastify.css";
import "@uppy/core/dist/style.css";
import "@uppy/drag-drop/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "@uppy/progress-bar/dist/style.css";
import "@uppy/file-input/dist/style.css";
import "@uppy/image-editor/dist/style.css";
import "react-reflex/styles.css";
import "styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Store, { IStore } from "store";
import { useEffect, useState } from "react";

import type { AppProps } from "next/app";
import Head from "next/head";
import OfflinePageContainer from "module/404/Container/OfflinePageContainer";
import { PulseLoader } from "react-spinners";
import Template from "component/Template";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [statusPage, setStatusPage] = useState(true);

  useEffect(() => {
    function changeStatus() {
      setStatusPage(navigator.onLine);
    }
    const handleStart = () => {
      setIsLoading(true);
    };

    const handleStop = () => {
      setIsLoading(false);
    };

    const handleComplete = () => {
      setIsLoading(false);
    };

    window.addEventListener("online", changeStatus);
    window.addEventListener("offline", changeStatus);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleStop);

    return () => {
      window.addEventListener("online", changeStatus);
      window.addEventListener("offline", changeStatus);
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: 0,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Country</title>
      </Head>
      <div className="light m-0 p-0 ">
        {isLoading && (
          <div className="fixed z-[1000] w-screen h-screen flex justify-center items-center bg-pinkBrand opacity-100 duration-1000 overflow-hidden">
            <PulseLoader color="white" className="m-auto" size={40} />
          </div>
        )}
        <Component {...pageProps} />
        <ToastContainer />
      </div>
    </QueryClientProvider>
  );
}
