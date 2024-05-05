"use client";

import { useChat } from "ai/react";
import { IoIosSend, IoMdPerson } from "react-icons/io";
import { FaRobot } from "react-icons/fa6";
import { AiOutlineRobot } from "react-icons/ai";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const handleTryprompt = async () => {
    const res = await fetch("/api/chatwithme", {
      method: "POST",
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="">
      <h1 className="text-2xl font-semibold text-center py-14">
        Welcome to chamith AI Chatbot!
      </h1>
      <div className="flex flex-col w-full max-w-xl px-5 mb-24 mx-auto stretch flex flex-col gap-5">
        {messages.map((m) => (
          <div key={m.id} className="flex items-start">
            <p className="font-semibold p-2 text-2xl ">
              {m.role === "user" ? <IoMdPerson /> : <AiOutlineRobot />}
            </p>
            <p className="text-sm whitespace-pre-wrap p-2 rounded-md border shadow-md">
              {m.content}
            </p>
          </div>
        ))}

        <button onClick={handleTryprompt}>try prompt</button>

        <form
          onSubmit={handleSubmit}
          className="fixed bottom-0 flex max-w-xl w-full  border border-gray-300 mb-8  rounded shadow-xl"
        >
          <input
            className=" w-full max-w-xl p-2 outline-none"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
          <button className="p-2 text-2xl" type="submit">
            <IoIosSend />
          </button>
        </form>
      </div>
    </div>
  );
}
