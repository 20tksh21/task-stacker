import { useState, useEffect } from "react";

import { supabase } from "../supabase";
import type { TaskType } from "./task";

export function useTasks() {
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [archivedTasks, setArchivedTasks] = useState<TaskType[]>([]);
    const [input, setInput] = useState<string>("");

    //日付の取得
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

      //データベースからデータ取得
    useEffect(() => {
        async function fetchProjects() {
            
            const { data } = await supabase.from('all-tasks').select('*');
            if (data) {
                setTasks(data.filter((task) => task.is_archive === false));
                setArchivedTasks(data.filter((task) => task.is_archive === true));
            }
        }
        fetchProjects()
    }, [setTasks])

    const addTask = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault(); //入れないと勝手にリロードされる
        if(!input.trim()) return;

  

        const { data, error } = await supabase
        .from('all-tasks')
        .insert([{ task_text: input, is_done: false, is_archive: false, created_date: formattedDate }])
        .select('*');

        if(error){
        console.error('タスクの追加に失敗:', error)
        return
        }
        if(data){
        setTasks([...tasks, data[0]])
        }

        setInput("");
  } 

    //タスクの削除
    const deleteTask = async (targetId: number) => {
        const { error } = await supabase
          .from('all-tasks')
          .delete()
          .eq('id', targetId)
        
        if (error) {
          console.error('タスクの削除に失敗:', error)
          return
        }

        //画面の配列から削除
        setTasks(tasks.filter((task) => task.id !== targetId))
        
    }

    //タスクのアーカイブ
    const toArchiveTask = async (targetId: number, currentIsArchive: boolean) => {
        const { error } = await supabase
        .from('all-tasks')
        .update({ is_archive: !currentIsArchive })
        .eq('id', targetId)

        if (error) {
            console.error('アーカイブに失敗')
            return;
        }

        const targetTask = tasks.find((task) => task.id === targetId);
        if(!targetTask) return;

        if(currentIsArchive == false){
            //画面上のタスク配列から削除し、アーカイブタスク配列に入れる（どちらも作り直し）
            setTasks(tasks.filter((task) => task.id !== targetId));
            setArchivedTasks([...archivedTasks, {...targetTask, is_archive: true} ])
        } else {
            setArchivedTasks(archivedTasks.filter((task) => task.id !== targetId));
            setTasks([...tasks, {...targetTask, is_archive: false} ])
        }

    }

    //タスクの完了
    const doneTask = async (targetId: number, currentIsDone: boolean) => {
        const { error } = await supabase
        .from('all-tasks')
        .update({ is_done: !currentIsDone }) // 現在と逆の真偽値を送る
        .eq('id', targetId)

        if (error) {
            console.error('完了に失敗:', error)
            return
        }      

        setTasks(tasks.map((task) => task.id === targetId ? {...task, is_done: !currentIsDone } : task))
    }    



    return {
        formattedDate,
        tasks, setTasks,
        archivedTasks, setArchivedTasks,
        input, setInput,
        addTask, deleteTask, toArchiveTask, doneTask
    }
}

//ここでこのファイル終わり