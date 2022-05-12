import { useFieldArray, useForm } from 'react-hook-form';
import { HiOutlineMinusCircle, HiOutlinePlusCircle } from 'react-icons/hi';

const DynamicForm = () => {
  const defaultValues = {
    title: '',
    tags: [
      {
        value: '',
      },
    ],
  };

  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useForm({ defaultValues });

  const { fields, insert, remove } = useFieldArray({ control, name: 'tags' });

  return (
    <div className="m-2 grid grid-cols-1 justify-center border lg:grid-cols-2">
      <form action="" className="m-2 border">
        <div className="m-2 border">
          <h3>Title</h3>
          <input type="text" className="border" {...register('title')} />
        </div>
        <div className="m-2 border">
          <h3>Tag</h3>
          <div className="space-y-2">
            {fields.map((_, i) => (
              <div key={i}>
                <div className="flex items-center">
                  <input
                    type="text"
                    className="border"
                    {...register(`tags.${i}.value`)}
                  />
                  {fields.length > 1 && (
                    <button type="button" onClick={() => remove(i)}>
                      <HiOutlineMinusCircle className="text-xl" type="button" />
                    </button>
                  )}
                  <button onClick={() => insert(i + 1, {})} type="button">
                    <HiOutlinePlusCircle className="text-xl" />
                  </button>
                </div>
                {errors.tags?.[i]?.value && (
                  <p>{errors.tags?.[i]?.value?.message}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </form>
      <div className="m-2 border">
        <pre>{JSON.stringify(watch(), null, 2)}</pre>
      </div>
    </div>
  );
};

export default DynamicForm;
