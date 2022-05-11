import { useState } from 'react';
import { useForm } from 'react-hook-form';

type SkillId = typeof skills[number]['id'];

interface Form {
  title: string;
  content: string;
  gender: 'man' | 'woman';
  skills: {
    [P in SkillId]: boolean;
  };
}

const SimpleForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Form>();

  const [result, setResult] = useState<Form>();

  const handleReset = () => {
    reset(undefined, {
      keepErrors: false,
    });
    setResult(undefined);
  };

  const onSubmit = (data: Form) => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(true);
        setResult(data);
        reset(undefined, {
          keepValues: true,
        });
      }, 1000)
    );
  };

  return (
    <div className="m-10 grid grid-cols-1 gap-6 rounded-md border-2 lg:grid-cols-2">
      <form onSubmit={handleSubmit(onSubmit)} className="m-5 space-y-5">
        <div className="border">
          <label htmlFor="title" className="mb-2 block">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="rounded-lg border bg-transparent"
            {...register('title', {
              required: '必須',
              maxLength: {
                value: 80,
                message: '80文字を超えています',
              },
            })}
          />
          <p>{watch('title')?.length || 0} / 80</p>
          {errors.title && (
            <p className="text-sm text-red-700">{errors.title.message}</p>
          )}
        </div>

        <div className="border">
          <label htmlFor="content" className="mb-3 block">
            本文
          </label>
          <textarea
            id="content"
            className="w-60 max-w-full rounded-xl border bg-transparent"
            {...register('content', {
              required: '必須',
              maxLength: {
                value: 400,
                message: '400文字を超えています',
              },
            })}
          />
          <p>{watch('content')?.length || 0} / 400</p>
          {errors.content && (
            <p className="text-sm text-red-700">{errors.content.message}</p>
          )}
        </div>

        <div className="border">
          <h2 className="mb-2">性別</h2>
          <div className="flex space-x-3">
            {gender.map(({ label, id }) => (
              <div key={id}>
                <input
                  type="radio"
                  value={label}
                  id={id}
                  {...register('gender', {
                    required: '選択してください',
                  })}
                />
                <label htmlFor={id}>{label}</label>
              </div>
            ))}
          </div>
          {errors.gender && (
            <p className="text-sm text-red-700">{errors.gender?.message}</p>
          )}
        </div>

        <div className="border">
          <h2 className="">スキル</h2>
          <div className="flex space-x-3">
            {skills.map(({ id, label }) => (
              <div key={id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={id}
                  value={label}
                  {...register(`skills.${id}`)}
                />
                <label htmlFor={id}>{label}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex space-x-3 border">
          <div>
            <button onClick={handleReset} type="button" className=" opacity-30">
              リセット
            </button>
          </div>
          <button
            disabled={isSubmitting}
            className="cursor-disabled pointer-none flex h-4 w-28 min-w-max items-center justify-center space-x-2 rounded-full bg-gray-700 px-6 py-3 text-center text-gray-200 shadow transition-colors hover:bg-pink-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-gray-700 disabled:hover:text-gray-200"
          >
            送信{isSubmitting && '中'}
          </button>
        </div>
      </form>

      <div className="m-5 flex items-center justify-center border">
        {isSubmitting && (
          <div className="mt-3 flex space-x-5">
            <h2 className="">結果</h2>
            <div className="justify-center">
              <pre className="center m-3 rounded border p-3">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleForm;

const gender = [
  {
    id: 'man',
    label: '男性',
  },
  {
    id: 'woman',
    label: '女性',
  },
] as const;

const skills = [
  {
    id: 'html',
    label: 'HTML',
  },
  {
    id: 'css',
    label: 'CSS',
  },
  {
    id: 'javascript',
    label: 'JavaScript',
  },
  {
    id: 'nextjs',
    label: 'Next.js',
  },
  {
    id: 'nuxtjs',
    label: 'Nuxt.js',
  },
] as const;
