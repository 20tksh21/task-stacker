import { useTasks } from "./useTasks";

export default function App() {

  const {
        tasks, 
        input, setInput,
        addTask, deleteTask, doneTask
    } = useTasks();

  //日付の取得
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
          <form onSubmit={addTask} className="flex gap-2 items-center m-6 ml-2">
            <button className="bg-gray-200 h-7 w-10 border rounded-md leading-none hover:bg-gray-400">追加</button>
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder="タスクを入力"
              className="bg-gray-200 border rounded-md h-7 p-1"
            />
          </form>

          {/*タスク一覧*/}
          <ul className="m-4">
            {tasks.map((task) => (
              <li key={task.id} className="flex gap-2 mb-2">
                {/*チェックボックス */}
                <input type="checkbox" checked={task.is_done} onChange={() => doneTask(task.id, task.is_done)}></input>
                
                <span>{task.task_text}</span>
                <button onClick={() => deleteTask(task.id)} className="px-1 border rounded-md">削除</button>
              </li>
            ))}
          </ul>
        
        </div>
      </div>
    </main>
  )
}