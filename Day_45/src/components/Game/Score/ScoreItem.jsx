import React from "react";

const ScoreItem = ({ stt, score, onRevTbl }) => {
   const { id, maxLive, points, result } = score;
   const handleRev = () => {
      onRevTbl(id);
   };

   const ratio = +points[points.length - 1] !== +result;
   return (
      <div className="score-inner">
         <table>
            <tbody>
               <tr>
                  <th>Số lần nhập</th>
                  <th>Đáp án trả lời</th>
               </tr>
               {points.map((point, i) => (
                  <tr key={point}>
                     <td>{i + 1}</td>
                     <td>{point}</td>
                  </tr>
               ))}
            </tbody>
            <tfoot>
               <tr>
                  <td colSpan={2}>Bảng {stt + 1}</td>
               </tr>
               <tr>
                  <td colSpan={2}>Số lần nhập tối đa: {maxLive}</td>
               </tr>
               <tr>
                  <td colSpan={2}>Tỷ lệ thắng: {ratio ? 0 : Math.floor((maxLive / points.length / maxLive) * 100)}%</td>
               </tr>
               <tr>
                  <td>
                     <button onClick={handleRev} className="btn__rev-tbl">
                        <span className="text">Xoá bảng {stt + 1}</span>
                     </button>
                  </td>
               </tr>
            </tfoot>
         </table>
      </div>
   );
};

export default ScoreItem;
