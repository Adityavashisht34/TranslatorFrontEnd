import "../../styles/Team.css";
import team01 from "../../assets/team-01.jpg";
import team02 from "../../assets/team-02.jpg";
import team03 from "../../assets/team-03.jpeg";
import team04 from "../../assets/team-04.jpeg";
import backgroundVideo from "../../assets/backgroundvideo.mp4";
import Header from "../Header/Header";

const teamMembers = [
  {
    imgUrl: team01,
    name: "Aditya Chhabra",
    position: "2210990063",
  },

  {
    imgUrl: team02,
    name: "Aditya Vashisht",
    position: "2210990074",
  },

  {
    imgUrl: team03,
    name: "Advitya Hans",
    position: "2210990076",
  },

  {
    imgUrl: team04,
    name: "Abhinav Mahajan",
    position: "2210990037",
  },
];

const Team = () => {
  return (
    <>
    <Header/>
    <div className="background-video">
      <video className="background-clip" autoPlay loop muted >
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <section className="our__team">
        <div className="container">
          <div className="team__content">
            <h1 className="subtitle">Our Team</h1>
          </div>
          <div className="team__wrapper">
            {teamMembers.map((item, index) => (
              <div className="team__item" key={index}>
                <div className="team__img">
                  <img src={item.imgUrl} alt="" />
                </div>
                <div className="team__details">
                  <h4>{item.name}</h4>
                  <p className="description">{item.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Team;
