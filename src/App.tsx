import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import type { TaskType } from "./task";

export default function App() {

  const [input, setInput] = useState<string>("");
  const [tasks, setTasks] = useState<TaskType[]>([]);


  //データベースからデータ取得
  useEffect(() => {
    async function fetchProjects() {
      const { data } = await supabase.from('all-tasks').select('*');
      if (data) setTasks(data);
    }
    fetchProjects()
  }, [])

  //日付の取得
  const today = new Date();
  const formattedDate = today.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const addTask = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault(); //入れないと勝手にリロードされる
    if(!input.trim()) return;

    //データベースにタスクを追加
    const { data, error } = await supabase.from('all-tasks').insert([{ task_text: input, is_done: false }]).select();
    if(error){
      console.error('タスクの追加に失敗:', error)
      return
    }
    if(data){
    setTasks([...tasks, data[0]])
    }

    setInput("");
  } 
  //データベースから削除
  const deleteTask = async (id: number) => {
    const { error } = await supabase
      .from('all-tasks')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('タスクの削除に失敗:', error)
      return
    }
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const changeIsDone = async (id: number, currentIsDone: boolean) => {
    const { error } = await supabase
      .from('all-tasks')
      .update({ is_done: !currentIsDone }) // 現在と逆の真偽値を送る
      .eq('id', id)

    if (error) {
      console.error('更新に失敗しました:', error)
      return
    }

    //画面上のタスクも更新
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, is_done: !currentIsDone } : task
      )
    )
  }





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
                <input type="checkbox" checked={task.is_done} onChange={() => changeIsDone(task.id, task.is_done)}></input>
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