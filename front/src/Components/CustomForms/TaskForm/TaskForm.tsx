import { zodResolver } from "@hookform/resolvers/zod";
import { useModal } from "../../../Context";
import { ITask, TaskProps } from "../../../Interfaces/Task";
import { TaskSchema, TaskValues } from "../../../Models";
import { SubmitHandler, useForm } from "react-hook-form";
import InputForm from "../../CustomInput/CustomInput";


interface Props {
  FuntionTask: (data: Partial<TaskProps>) => Promise<boolean>;
  edit: boolean;
  projectId: number;
  task?: ITask;
}


export const TaskForm = ({ FuntionTask, edit, task, projectId }: Props) => {
  const { closeModal } = useModal();


  let title = "", description = "";
  if (edit) {
    title = task?.title || "";
    description = task?.description || "";
  }

  const { control, handleSubmit, formState: { errors } } = useForm<TaskValues>({
    resolver: zodResolver(TaskSchema),
    mode: "onBlur",
    defaultValues: {
      title: title,
      description: description,
    },
  })

  const onSubmit: SubmitHandler<TaskValues> = async (data) => {

    const Task = { ...data, projectId: projectId };

    if (edit && task?.id) {
      const res = await FuntionTask({ id: task.id, task: Task });
      if (res) {
        closeModal();
      }
      return
    }
    const res = await FuntionTask({ task: Task });
    if (res) {
      closeModal();
    }
  }

  return (
    <div className="form-project">
      {edit ? <h1>Edit Project</h1> : <h1>Create Project</h1>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputForm
          name="title"
          control={control}
          label="Title"
          type="text"
          error={errors.title}
        />
        <InputForm
          name="description"
          control={control}
          label="Description"
          type="text"
          error={errors.description}
        />

        <div className="Buttons">
          <button type="submit" className="Button-submit">
            {edit ? "Edit Project" : "Create Project"}
          </button>
          <button type="button" onClick={closeModal} className="Button-submit">
            Close
          </button>
        </div>
      </form>
    </div>

  )

}
