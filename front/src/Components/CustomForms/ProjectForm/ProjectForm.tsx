import { zodResolver } from "@hookform/resolvers/zod";
import { FuntionProps, ICreateProject, IProject, IUpdateProject } from "../../../Interfaces";
import { CreateProjectSchema, CreateProjectValues } from "../../../Models";
import InputForm from "../../CustomInput/CustomInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { useModal } from "../../../Context";
import './ProjectForm.css'



interface Props {
  FunctionProject: (data: Partial<FuntionProps>) => Promise<boolean>;
  edit: boolean;
  project?: IProject;
}

export const ProjectForm = ({ FunctionProject, edit, project }: Props) => {
  const { closeModal: CloseModal } = useModal();

  let title = "", description = "";
  if (edit) {
    title = project?.title || "";
    description = project?.description || "";
  }

  const { control, handleSubmit, formState: { errors } } = useForm<CreateProjectValues>({
    resolver: zodResolver(CreateProjectSchema),
    mode: "onBlur",
    defaultValues: {
      title: title,
      description: description,
    },
  })



  const onSubmit: SubmitHandler<CreateProjectValues> = async (data) => {
    if (edit && project?.id) {
      const res = await FunctionProject({ id: project.id.toString(), project: data });
      if (res) {
        CloseModal();
      }
      return
    }
    const res = await FunctionProject({ project: data });
    if (res) {
      CloseModal();
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
          <button type="button" onClick={CloseModal} className="Button-submit">
            Close
          </button>
        </div>
      </form>
    </div>
  )

}
