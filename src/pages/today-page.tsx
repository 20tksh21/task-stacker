import { useTasks } from "../components/useTasks";

export default function TodayPage () {

  const {
        formattedDate,
        tasks, 
        input, setInput,
        addTask, deleteTask, toArchiveTask, doneTask
    } = useTasks();

  const [year, month, day] = formattedDate.split("-");

  return (
    <main className="text-gray-700">
      <div className="flex h-screen">


        {/*メイン部分 flex-1は全体ー他の要素のサイズを全てこれにする*/}
        <div className="flex-1">
          {/*日付部分 */}
          <p className="p-2 bg-sky-400">{year}年{month}月{day}日のタスク</p>

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
            {/*タスク一覧から非アーカイブタスクのみ表示*/}
            {tasks.filter((task) => task.is_archive === false).map((task) => (
              <li key={task.id} className="flex gap-2 mb-2">
                {/*チェックボックス */}
                <input type="checkbox" checked={task.is_done} onChange={() => doneTask(task.id, task.is_done)}></input>
                
                <span>{task.task_text}</span>
                <button onClick={() => deleteTask(task.id)} className="px-1 border rounded-md">削除</button>
                <button onClick={() => toArchiveTask(task.id, task.is_archive)} className="px-1 border rounded-md">アーカイブ</button>
              </li>
            ))}
          </ul>
        
        </div>
      </div>
    </main>
  )
}