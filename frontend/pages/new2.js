import React, { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMemo } from "../src/modules/memo";
import { showSnackbar } from "../src/modules/snackbar";
import Link from "next/link";

const StatusPage = props => {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const target = e.target;
    const title = target.title.value;
    const content = target.content.value;

    dispatch(showSnackbar("Success!"));

    dispatch(
      createMemo({
        title,
        content
      })
    );
  };

  const memoList = useSelector(state => state.memo.memoList);

  return (
    <div>
      <h1>メモ作成</h1>
      <Link href="new">new</Link>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <label htmlFor="">タイトル</label>
            </div>
            <input type="text" name="title" placeholder="title" />
          </div>
          <div>
            <div>
              <label htmlFor="">本文</label>
            </div>
            <textarea name="content" placeholder="content" />
          </div>
          <div>
            <input type="submit" value="submit" />
          </div>
        </form>
      </div>

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
    </div>
  );
};

export default StatusPage;
