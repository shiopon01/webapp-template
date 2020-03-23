import React from "react";
import { useSelector } from "react-redux";

const Memos = props => {
  const memoList = useSelector(state => state.memoList);
  console.log("memoList", memoList);

  return (
    <div>
      {memoList.map(memo => {
        // ループで展開する要素には一意なkeyをつける（ReactJSの決まり事）
        return (
          <div key={memo.title}>
            {memo.title}: {memo.content}
          </div>
        );
      })}
    </div>
  );
};

export default Memos;
