import { useTasks } from "../components/useTasks";
import type { TaskType } from "../components/task";
import { useState } from "react";

export default function ArchivePage () {

    const [selectedMonth, setSelectedMonth] = useState<string>("all");
    const { archivedTasks, doneTask } = useTasks();

    // アーカイブタスクから "YYYY-MM" の形式の月を重複なく抽出する
    const availableMonths = Array.from(
        new Set(archivedTasks.map(task => task.created_date?.slice(0, 7)).filter(Boolean))  //中身が空のものは削除
    );


    const filteredTasks = archivedTasks.filter((task) => {
        if (selectedMonth === "all") return true; // 「すべての月」ならそのまま通す

        return task.created_date && task.created_date.startsWith(selectedMonth);
    });


    const groupedByDate = filteredTasks.reduce((acc, task) => {

        if (!acc[task.created_date]) {
            acc[task.created_date] = []; // その日のグループがまだなければ作る
        }
        acc[task.created_date].push(task); // その日のグループにタスクを追加する
        
        return acc;
    }, {} as Record<string, TaskType[]>);


    return (
        <main>
            {/* 月を選択するフィルターUI */}
            <div className="mb-4">
                <label>月で絞り込み：</label>
                <select 
                    value={selectedMonth} 
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="border p-1 rounded ml-2"
                >
                    <option value="all">すべての月</option>
                   {/*availableMonthsをmapで展開してoptionを自動生成する */}
                    {availableMonths.map((month) => {
                        const [year, m] = month.split("-");

                        return (
                            <option key={month} value={month}>
                                {year}年{m}月
                            </option>
                        );
                    })}
                </select>
            </div>


            <h2>アーカイブタスク一覧</h2>
            {/*プロパティを配列に変換したものを各要素としてもつ配列にしてmap*/}
            {Object.entries(groupedByDate).map(([date, tasks]) => (
            <div key={date} className="mb-4">
                <h3 className="bg-gray-100 font-bold p-1">{date}</h3>
                
                <ul>
                {tasks.map((task) => (
                    
                    <li key={task.id}>
                        <input type="checkbox" checked={task.is_done} onChange={() => doneTask(task.id, task.is_done)}></input>
                        <span>{task.task_text}</span>
                    </li>
                ))}
                </ul>
            </div>
            ))}

        </main>
    )
}