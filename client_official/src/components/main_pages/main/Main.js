import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import "./Main.css";
import PuffLoader from "react-spinners/PuffLoader";
import axios from "axios";
import Listitem from "../main/list/List";
import Featured from "./Feature/Feature";
import Grid from "./grid/Grid";
import HorizontalList from "./HorizontalList/HorizontalList";
import SkeletonList from "../utils/skeleton/SkeletonList/SkeletonList";

const Movies = () => {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [loading, setLoading] = useState(false);
  const [top5Lists, setTop5Lists] = useState([]);
  const [recommend, setRecommend] = useState([]);
  const [listTrigger, setListTrigger] = useState(true);
  const [topRanking] = state.topRanking;

  useEffect(() => {
    const getTop5Lists = async () => {
      try {
        const res = await axios.get("/api/top5Lists", {
          headers: {
            Authorization: token,
          },
        });
        setTop5Lists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getTop5Lists();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/user/recommendMovies", {
          headers: {
            Authorization: token,
          },
        });
        setRecommend(res.data.responseData);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <PuffLoader color={"#36D7B7"} loading={true} size={60} />
      </div>
    );
  }

  const ToggleTrigger = (value) => {
    setListTrigger(value);
  };

  const getTrigger = () => {
    return listTrigger;
  };

  return (
    <>
      <Featured
        watch="/watch/453395/62cd4cc3050b9012b85c9afa"
        trailer="https://youtu.be/Rt_UqUm38BI"
        bigImg="https://phongvu.vn/cong-nghe/wp-content/uploads/2022/05/Doctor-Strange-2-hut-20-ty-ngay-doctor-strange-multiverse-1280-1651093649295-16520-1652081546-633-width1280height720.jpg"
        titleImg="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/078277ed-5380-4deb-b166-997beba79634/df0bvfh-a800000f-1d9d-42e0-b1d6-bccab4cef2f3.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzA3ODI3N2VkLTUzODAtNGRlYi1iMTY2LTk5N2JlYmE3OTYzNFwvZGYwYnZmaC1hODAwMDAwZi0xZDlkLTQyZTAtYjFkNi1iY2NhYjRjZWYyZjMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.iM8oJp_L9pLRomQ0E-QIZ9CAQzUuPyVOjmGcxnFL3fE"
        smallImg="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg"
        desc="Doctor Strange, with the help of mystical allies both old and new, traverses the mind-bending and dangerous alternate realities of the Multiverse to confront a mysterious new adversary."
      />
      <div className="main_page">
        {recommend.length > 0 ? (
          <Listitem
            movies={recommend}
            title="You May Like"
            getTrigger={getTrigger}
            ToggleTrigger={ToggleTrigger}
          ></Listitem>
        ) : (
          <SkeletonList />
        )}
        <Listitem
          movies={topRanking}
          title="Top Trending"
          getTrigger={getTrigger}
          ToggleTrigger={ToggleTrigger}
        ></Listitem>
        {top5Lists.map((list, index) => {
          switch (index) {
            case 2:
              return <HorizontalList movies={list.items} />;
            case 3:
              return (
                <Grid
                  movies={list.items}
                  title={list.title}
                  index={index}
                ></Grid>
              );
            default:
              return (
                <Listitem
                  movies={list.items}
                  title={list.title}
                  getTrigger={getTrigger}
                  ToggleTrigger={ToggleTrigger}
                ></Listitem>
              );
          }
        })}
      </div>
    </>
  );
};

export default Movies;
