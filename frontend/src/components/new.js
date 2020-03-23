import Link from 'next/link'

const New = props => {
  const handleSubmit = e => {
    e.preventDefault();
    const target = e.target;
    const title = target.title.value;
    const content = target.content.value;
    props.createMemo({
      title,
      content
    });
  };

  return (
    <div>
      <h1>メモ作成</h1>
      <Link href="new2">new2</Link>
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
        {props.memoList.map(memo => {
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

export default New;
