import { zodResolver } from "@hookform/resolvers/zod";
import { ICreateProject } from "../../../Interfaces";
import { CreateProjectSchema, CreateProjectValues } from "../../../Models";
import InputForm from "../../CustomInput/CustomInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { useModal } from "../../../Context";

interface Props {
  CreateProject: (project: ICreateProject) => Promise<boolean>;
}

export const CreateProjectForm = ({ CreateProject }: Props) => {
  const { setState } = useModal();
  const { control, handleSubmit, formState: { errors } } = useForm<CreateProjectValues>({
    resolver: zodResolver(CreateProjectSchema),
    mode: "onBlur",
    defaultValues: {
      title: "",
      description: "",
    },
  })

  const onSubmit: SubmitHandler<CreateProjectValues> = async (data) => {
    const res = await CreateProject(data);
    if (res) {
      setState(false);
    }
  }
  return (
    <div className="Form">
      <h1>Create Project</h1>
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
            Create Project
          </button>
        </div>
      </form>
    </div>
  )

}
