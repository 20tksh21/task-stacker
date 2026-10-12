import { useState } from "react";
import { Task } from "./task";

export default function App() {
  /*日付の取得*/
  const today = new Date();
  const formattedDate = today.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });


const [taskText, setTaskText] = useState<string>("")


  return (
    <main className="bg-amber-100">
      <div className="flex h-screen">

        {/*サイドメニュー部分*/}
        <div className="p-4 border-r-4 border-amber-800">
          <h1 className="mb-4">今日のタスク</h1>
          <h1 className="mb-4">サイドメニュー</h1>
          <h1 className="mb-4">サイドメニュー</h1>
        </div>

        {/*メイン部分 flex-1は全体ー他の要素のサイズを全てこれにする*/}
        <div className="flex-1">
          <p className="p-2 bg-amber-800">{formattedDate}のタスク</p>
          {/*入力フォーム */}
          <input 
            type="text" 
            value={taskText} 
            onChange={(e) => setTaskText(e.target.value)} 
            placeholder="タスクを入力"
          />
          {/*モックデータ */}
          <Task taskText="テストデータ１" isDone={false}></Task>
          <Task taskText="テストデータ２" isDone={true}></Task>
          
        
        </div>
      </div>
    </main>
  )
}