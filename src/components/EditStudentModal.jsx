import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../store/slices/modalSlice'
import { addStudent, updateStudent } from '../store/slices/alumnosSlice'

function EditStudentModal() {
  const dispatch = useDispatch()
  const { isOpen, type, payload } = useSelector((state) => state.modal)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: '',
      apellido: '',
      dni: '',
      curso: '',
      nacimiento: '',
      cumpleAsistencia: false,
    },
  })

  useEffect(() => {
    if (isOpen && payload) {
      reset({
        nombre: payload.nombre ?? '',
        apellido: payload.apellido ?? '',
        dni: payload.dni ?? '',
        curso: payload.curso ?? '',
        nacimiento: payload.nacimiento ?? '',
        cumpleAsistencia: Boolean(payload.cumpleAsistencia),
      })
    } else if (isOpen && !payload) {
      reset({
        nombre: '',
        apellido: '',
        dni: '',
        curso: '',
        nacimiento: '',
        cumpleAsistencia: false,
      })
    }
  }, [isOpen, payload, reset])

  if (!isOpen || !['editStudent', 'createStudent'].includes(type)) {
    return null
  }

  const isCreate = type === 'createStudent'

  const onSubmit = (data) => {
    if (isCreate) {
      dispatch(addStudent(data))
    } else {
      dispatch(
        updateStudent({
          id: payload.id,
          ...data,
        }),
      )
    }

    dispatch(closeModal())
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 px-4">
      <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
              {isCreate ? 'Agregar alumno' : 'Editar alumno'}
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              {isCreate ? 'Completa los datos del nuevo alumno' : 'Actualiza los datos del alumno'}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => dispatch(closeModal())}
            className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Nombre</label>
              <input
                {...register('nombre', { required: 'El nombre es obligatorio' })}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-0 focus:border-sky-500"
              />
              {errors.nombre && <p className="mt-1 text-sm text-rose-600">{errors.nombre.message}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Apellido</label>
              <input
                {...register('apellido', { required: 'El apellido es obligatorio' })}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-0 focus:border-sky-500"
              />
              {errors.apellido && <p className="mt-1 text-sm text-rose-600">{errors.apellido.message}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">DNI</label>
              <input
                {...register('dni', { required: 'El DNI es obligatorio' })}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-0 focus:border-sky-500"
              />
              {errors.dni && <p className="mt-1 text-sm text-rose-600">{errors.dni.message}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Curso</label>
              <input
                {...register('curso', { required: 'El curso es obligatorio' })}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-0 focus:border-sky-500"
              />
              {errors.curso && <p className="mt-1 text-sm text-rose-600">{errors.curso.message}</p>}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Fecha de nacimiento</label>
            <input
              type="text"
              {...register('nacimiento', { required: 'La fecha es obligatoria' })}
              placeholder="dd/mm/yyyy"
              className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-0 focus:border-sky-500"
            />
            {errors.nacimiento && <p className="mt-1 text-sm text-rose-600">{errors.nacimiento.message}</p>}
          </div>

          <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-3 text-sm text-slate-700">
            <input type="checkbox" {...register('cumpleAsistencia')} className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500" />
            Cumple con el 80% de asistencia
          </label>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => dispatch(closeModal())}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
            >
              {isCreate ? 'Agregar alumno' : 'Guardar cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditStudentModal
