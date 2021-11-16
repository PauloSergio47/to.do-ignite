import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks(oldTask => [...oldTask, newTask])
  }

  function handleToggleTaskDone(id: number) {
    const upDateTask = tasks.map(tasks => ({...tasks}))

    const foundItem = upDateTask.find(item => item.id === id);

    if(!foundItem)
    return;

    foundItem.done = !foundItem.done;
    setTasks(upDateTask);
  }

  function handleRemoveTask(id: number) {
    setTasks(oldTask => oldTask.filter(
      tasks => tasks.id !== id
    ));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})