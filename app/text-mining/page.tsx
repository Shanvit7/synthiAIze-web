"use client";
import { FC,useState } from "react";
/********* UTILS  **********/
import { useDropzone } from "react-dropzone";
import useSWRMutation from "swr/mutation";
/********* COMPONENTS **********/
import BasicButton from "../components/Button/BasicButton";
import Loader from "../components/Loaders/Loader";
import Error from "../components/Icons/Error";
/********* SERVICES **********/
import { fetchTextExtraction } from "../services/synthAIze.service";

const TextMiningPage : FC = () => {
  const [selectedFile, setSelectedFile] = useState<boolean | null | File>(null);
  const [text, setText] = useState("");
  const handleMutationSuccess = (data : any) => {
    if (data?.text) {
      setText(data?.text);
    } else {
      setText(
        "Couldn't extract the given text from given file, make sure that the file is not corrupt!"
      );
    }
  };
  const {
    trigger,
    isMutating: isExtracting,
    error: extractionError,
  } = useSWRMutation("/api/extract-text-from-file", fetchTextExtraction, {
    onSuccess: handleMutationSuccess,
  });
  const onDrop = async (acceptedFiles : File[]) => {
    const fileData = acceptedFiles[0];
    setSelectedFile(true);
    trigger({ fileData } as unknown as null | undefined);
  };

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop,
  });

  const onReset = async () => {
    setSelectedFile(null);
  };

  return (
    <section className="text-black">
      {!selectedFile ? (
        <>
          <div className="flex flex col items-center justify-center h-2/3 p-8">
            <div
              {...getRootProps()}
              className="text-center border-4 border-dashed border-black py-4 px-6 rounded-md cursor-pointer"
            >
              <input {...getInputProps()} />
              <p>Drag and drop a file here, or click to select a file</p>
            </div>
          </div>
          <div className="p-8 text-center text-2xl">
            <h1 className="pb-4">How does it work?</h1>
            <h4>
              Text mining, also known as text analytics or natural language
              processing (NLP), is a technology that enables computers to
              extract meaningful information and insights from unstructured text
              data. By employing techniques such as information retrieval,
              machine learning, and linguistic analysis, text mining facilitates
              tasks like sentiment analysis, topic modeling, named entity
              recognition, and document classification. It has diverse
              applications, including customer feedback analysis, market
              research, fraud detection, and content recommendation systems.
              Text mining empowers organizations to unlock valuable knowledge
              from vast amounts of textual information, leading to enhanced
              decision-making and improved understanding of human-generated
              content.
            </h4>
          </div>
        </>
      ) : isExtracting ? (
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      ) : extractionError ? (
        <div className="flex flex-col justify-center">
          <div className="h-32 flex justify-center">
            <Error />
          </div>
          <h2 className="text-center p-4 text-xl">
            Something went wrong. Please try again later.
          </h2>
        </div>
      ) : (
        <>
          <h2 className="text-center p-4 text-xl">{text}</h2>
          <div className="flex justify-center p-4">
            <BasicButton onClick={onReset}>Try Again</BasicButton>
          </div>
        </>
      )}
    </section>
  );
};

export default TextMiningPage;
