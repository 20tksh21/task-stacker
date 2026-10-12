import { useState } from "react";
import { Task } from "./task";

export default function App() {

const [taskText, setTaskText] = useState<string>("")

const handleAdd = () => {

}

  /*日付の取得*/
  const today = new Date();
  const formattedDate = today.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });




  return (
    <main className="text-gray-700">
      <div className="flex h-screen">

        {/*サイドメニュー部分*/}
        <div className="p-4 border">
          <h1 className="mb-4">今日のタスク</h1>
          <h1 className="mb-4">サイドメニュー</h1>
          <h1 className="mb-4">サイドメニュー</h1>
        </div>

        {/*メイン部分 flex-1は全体ー他の要素のサイズを全てこれにする*/}
        <div className="flex-1">
          {/*日付部分 */}
          <p className="p-2 bg-sky-400">{formattedDate}のタスク</p>

          {/*入力フォーム */}
          <div className="flex gap-2 items-center m-6 ml-2">
            <button onClick={handleAdd} className="bg-gray-200 h-7 w-10 border rounded-md leading-none hover:bg-gray-400">追加</button>
            <input 
              type="text" 
              value={taskText} 
              onChange={(e) => setTaskText(e.target.value)} 
              placeholder="タスクを入力"
              className="bg-gray-200 border rounded-md h-7 p-1"
            />
          </div>

          {/*モックデータ */}
          <div className="m-4">
          <Task taskText="テストデータ１" isDone={false}></Task>
          <Task taskText="テストデータ２" isDone={true}></Task>
          </div>
        
        </div>
      </div>
    </main>
  )
}