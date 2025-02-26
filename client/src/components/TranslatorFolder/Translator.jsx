import { useEffect, useState } from "react";
import axios from "axios";
import lang from "../../languages";
import "../../styles/Translator.css";
import backgroundVideo from "../../assets/backgroundvideo.mp4";
import Header from "../Header/Header";

function Translator() {
  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");
  const [fromLanguage, setFromLanguage] = useState("en-GB");
  const [toLanguage, setToLanguage] = useState("es-ES");
  const [languages, setLanguages] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [translations, setTranslations] = useState([]); // State to hold user's translations
  const id = localStorage.getItem('userId');

  useEffect(() => {
    setLanguages(lang);
  }, []);


  const serverCall = (e) => {
    e.preventDefault();
    if (!id) {
      console.error("User  ID is null. Please log in.");
      return;
    }

    let data = {
      userId:id,
      fromLanguage: fromLanguage,
      fromTranslation: fromText,
      toLanguage: toLanguage,
      toTranslation: toText,
    };
    console.log(data.userId)

    let url = `http://localhost:8080/api/translations/save/${data.userId}`
    console.log(url)
    axios.post(url, data)
      .then((response) => {
        console.log(response)
        setFromText(""); // Clear input fields
        setToText("");
      })
      .catch(err => console.log(err));
  };

  const Translate = () => {
    setLoading(true);
    let url = `https://api.mymemory.translated.net/get?q=${fromText}&langpair=${fromLanguage}|${toLanguage}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setToText(data.responseData.translatedText);
        setLoading(false);
      });
  };

  return (
    <>
      <Header />
      <div className="background-video">
        <video className="background-clip" autoPlay loop muted>
          <source src={backgroundVideo} type="video/mp4" />
        </video>
        <div className="container">
          <div className="wrapper">
            <div className="text-input">
              <textarea
                name="from"
                className="from-text"
                placeholder="Enter Text"
                id="from"
                value={fromText}
                onChange={(e) => {
                  setFromText(e.target.value);
                  if (e.target.value === "") {
                    setToText("");
                    return;
                  } else {
                    Translate();
                  }
                }}
              ></textarea>
              <textarea
                name="to"
                className="to-text"
                id="to"
                value={toText}
                readOnly
              ></textarea>
            </div>
            <ul className="controls">
              <li className="row from">
                <select className="fromLang"
                  value={fromLanguage}
                  onChange={(e) => {
                    setFromLanguage(e.target.value);
                  }}
                >
                  {Object.entries(languages).map(([code, name]) => (
                    <option key={code} value={code}>
                      {name}
                    </option>
                  ))}
                </select>
              </li>
              <li className="row to">
                <select className="toLang"
                  value={toLanguage}
                  onChange={(e) => {
                    setToLanguage(e.target.value);
                    Translate();
                  }}
                >
                  {Object.entries(languages).map(([code, name]) => (
 <option key={code} value={code}>
                      {name}
                    </option>
                  ))}
                </select>
              </li>
              <li className="row submit">
                <button onClick={serverCall}>Save Translation</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Translator;