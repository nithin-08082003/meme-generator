import React from "react";
import axios from "axios";

export default function Main() {
  const [inputs, setInputs] = React.useState({
    top_text: "",
    bottom_text: "",
    constantImg:
      "https://image.winudf.com/v2/image1/Y29tLmdyYXBoaWMuZGVzaWduLm1lbWUubWFrZXJfaWNvbl8xNjEyMDc1OTI4XzA3OA/icon.png?w=&fakeurl=1",
  });

  const [ImgArray, setImgArray] = React.useState(null);

  React.useEffect(() => {
    axios.get("https://api.imgflip.com/get_memes").then((response) => {
      setImgArray(response.data.data.memes);
    });
  }, []);

  function ImgFun() {
    let newImg = ImgArray;
    const apiImgs = Math.floor(Math.random() * newImg.length);
    let imgUrl = newImg[apiImgs].url;

    setInputs((prevImg) => ({
      ...prevImg,
      constantImg: imgUrl,
    }));
  }

  function memeInput(event) {
    event.preventDefault();
    let { name } = event.target;
    setInputs((prevIn) => ({
      ...prevIn,
      [name]: event.target.value,
    }));
  }

  return (
    <div className="Main">
      <div className="Form">
        <input
          maxLength={20}
          onChange={memeInput}
          name="top_text"
          value={inputs.top_text}
          className="top_text"
          placeholder="top text"
          type="text"
        />
        <input
          maxLength={20}
          onChange={memeInput}
          name="bottom_text"
          value={inputs.bottom_text}
          className="bottom_text"
          placeholder="bottom text"
          type="text"
        />
        <button onClick={ImgFun} className="btn">
          Get New Image
        </button>
      </div>
      <div
        style={{ backgroundImage: `url(${inputs.constantImg})` }}
        className="memeDiv"
      >
        <h2 className="text_top">{inputs.top_text}</h2>
        <h2 className="text_bottom">{inputs.bottom_text}</h2>
      </div>
    </div>
  );
}
