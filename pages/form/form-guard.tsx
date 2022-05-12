import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useFormGuard } from '../../lib/form-guard';

const FormGuard = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm();

  useFormGuard(isDirty);

  const submit = () => {
    alert('送信しました。ページ遷移ができます。');
    reset(undefined, {
      keepValues: true,
    });
  };

  return (
    <div className="flex flex-col items-center text-center">
      <div className="border ">
        <form onSubmit={handleSubmit(submit)} className="m-2 space-x-3 border">
          <input
            type="text"
            className="rounded-md border"
            {...register('name')}
            autoComplete="off"
          />
          <button className="h-auto w-20 rounded-md bg-slate-400 hover:bg-slate-600 hover:text-white hover:transition-colors">
            送信
          </button>
        </form>
      </div>
      <div className='border'>
        <div className='border'>
          {isDirty ? (
            <h4 className="text-red-400">ページ遷移不可!!</h4>
          ) : (
            <h4 className="text-green-400">ページ遷移可!!</h4>
          )}
        </div>
        <div className='border'>
          <Link href="/">
            <button className="mt-2 rounded-md bg-purple-400 p-2 hover:bg-purple-700 hover:text-white hover:transition-colors">
              <a>ホームへ遷移</a>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FormGuard;
