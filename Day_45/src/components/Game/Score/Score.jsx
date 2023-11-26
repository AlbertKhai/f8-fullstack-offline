import React from "react";
import ScoreItem from "./ScoreItem";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Score = () => {
   const score = useSelector(({ tblScore }) => tblScore.score);
   const dispatch = useDispatch();

   const handleRevTbl = (id) => {
      dispatch({
         type: "toast/add",
         payload: {
            mess: "Bạn có chắc muốn xoá bảng này\n Bấm vào đây để xoá",
            type: "warning",
            confirm: () => {
               dispatch({ type: "score/remove", payload: id });
            },
         },
      });
   };
   return (
      <div className="score">
         {score.map((item, id) => (
            <ScoreItem key={item.id} stt={id} score={item} onRevTbl={handleRevTbl} />
         ))}
      </div>
   );
};

export default Score;
