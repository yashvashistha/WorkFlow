import { useCallback, useContext } from "react";
import axios from "axios";
import { APIContext } from "./APIContext";
import { AuthContext } from "./AuthContext";

let url = process.env.REACT_APP_BASE_URL;
let url1 = process.env.REACT_APP_BASE_URL1;

export const useManualServerSentEvents = ({ input, endpoint, user=null }) => {

  const { setMessages, setChatInput, getCurrentTime, setIsGenerating } =
    useContext(APIContext);

  const { userData } = useContext(AuthContext);

  const startFetching = useCallback(() => {
    setIsGenerating(true);

    const fetchData = async () => {
      let d;

      if(user){
        d = {
          user_id: userData.username,
          query: input.charAt(0).toUpperCase() + input.slice(1),
          user: user,
        }
      } else {
        d = {
          user_id: userData.username,
          query: input.charAt(0).toUpperCase() + input.slice(1),
        }
      }

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: endpoint == "IAM_Sailpoint" ? `${url1}/${endpoint}` : `${url}/${endpoint}`,
        data: d,
      };

      setMessages((prevMessage) => [
        ...prevMessage,
        {
          time: getCurrentTime(),
          sender: "user",
          query: input.charAt(0).toUpperCase() + input.slice(1),
        },
      ]);

      setChatInput({
        input: "",
        send: false,
      });
      try {
        const chatresponse = await axios.request(config);
        setMessages((prevMessage) => [
          ...prevMessage,
          {
            time: getCurrentTime(),
            sender: "ai",
            query: chatresponse.data,
          },
        ]);
      } catch (error) {
        console.error(error);
        if (axios.isCancel(error)) {
          console.log("Fetch aborted");
        } else {
          console.error("Fetch error:", error);
        }
      } finally {
        setIsGenerating(false);
      }
    };

    fetchData();
  }, [input]);

  return {
    startFetching,
  };
};
