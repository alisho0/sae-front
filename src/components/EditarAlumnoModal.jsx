import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../store/slices/modalSlice'
import { addAlumno, updateAlumno } from '../store/slices/alumnosSlice'
import { getEscuelaIdFromUser, getUserRole } from '../utils/auth'
import { notifyError, notifySuccess } from '../utils/notifications'

function EditarAlumnoModal() {
  const dispatch = useDispatch()
  const { isOpen, type, payload } = useSelector((state) => state.modal)
  const { user } = useSelector((state) => state.auth)
  const currentRole = getUserRole(user)
  const currentEscuelaId = getEscuelaIdFromUser(user);

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
      creadoPorEscuela: false,
      editadoPorEscuela: false
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
        localidad: payload.localidad ?? '',
        cumpleAsistencia: Boolean(payload.cumpleAsistencia),
      })
    } else if (isOpen && !payload) {
      reset({
        nombre: '',
        apellido: '',
        dni: '',
        curso: '',
        nacimiento: '',
        localidad: '',
        cumpleAsistencia: false,
      })
    }
  }, [isOpen, payload, reset])

  if (!isOpen || !['editarAlumno', 'crearAlumno'].includes(type)) {
    return null
  }

  const isCreate = type === 'crearAlumno'
  const isEditadoPorEscuela = currentRole == 'DIRECTOR'

  const onSubmit = async (data) => {
    const alumno = {
      ...data,
      editadoPorEscuela: isEditadoPorEscuela,
      creadoPorEscuela: isCreate,
      escuelaId: currentEscuelaId,
    }

    try {
      if (isCreate) {
        await dispatch(addAlumno(alumno)).unwrap()
        notifySuccess('Alumno creado correctamente.')
      } else {
        await dispatch(
          updateAlumno({
            id: payload.id,
            alumno,
          }),
        ).unwrap()
        notifySuccess('Alumno actualizado correctamente.')
      }

      dispatch(closeModal())
    } catch (error) {
      notifyError(
        typeof error === 'string'
          ? error
          : isCreate
            ? 'No se pudo crear el alumno.'
            : 'No se pudo actualizar el alumno.',
      )
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 px-3 sm:px-4 py-4">
      <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
              {isCreate ? 'Agregar alumno' : 'Editar alumno'}
            </p>
            <h2 className="mt-1 sm:mt-2 text-xl sm:text-2xl font-semibold text-slate-900">
              {isCreate ? 'Completa los datos del nuevo alumno' : 'Actualiza los datos del alumno'}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => dispatch(closeModal())}
            className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 shrink-0"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 sm:mt-6 space-y-3.5 sm:space-y-4">
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 sm:mb-2 block text-xs sm:text-sm font-medium text-slate-700">Nombre<span className='text-red-700 font-semibold text-lg'>*</span></label>
              <input
                {...register('nombre', { required: 'El nombre es obligatorio' })}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-0 focus:border-sky-500"
              />
              {errors.nombre && <p className="mt-1 text-xs sm:text-sm text-rose-600">{errors.nombre.message}</p>}
            </div>

            <div>
              <label className="mb-1.5 sm:mb-2 block text-xs sm:text-sm font-medium text-slate-700">Apellido<span className='text-red-700 font-semibold text-lg'>*</span></label>
              <input
                {...register('apellido', { required: 'El apellido es obligatorio' })}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-0 focus:border-sky-500"
              />
              {errors.apellido && <p className="mt-1 text-xs sm:text-sm text-rose-600">{errors.apellido.message}</p>}
            </div>

            <div>
              <label className="mb-1.5 sm:mb-2 block text-xs sm:text-sm font-medium text-slate-700">DNI<span className='text-red-700 font-semibold text-lg'>*</span></label>
              <input
                {...register('dni', { required: 'El DNI es obligatorio' })}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-0 focus:border-sky-500"
              />
              {errors.dni && <p className="mt-1 text-xs sm:text-sm text-rose-600">{errors.dni.message}</p>}
            </div>

            <div>
              <label className="mb-1.5 sm:mb-2 block text-xs sm:text-sm font-medium text-slate-700">Curso<span className='text-red-700 font-semibold text-lg'>*</span></label>
              <input
                {...register('curso', { required: 'El curso es obligatorio' })}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-0 focus:border-sky-500"
              />
              {errors.curso && <p className="mt-1 text-xs sm:text-sm text-rose-600">{errors.curso.message}</p>}
            </div>
          </div>

          <div>
            <label className="mb-1.5 sm:mb-2 block text-xs sm:text-sm font-medium text-slate-700">Fecha de nacimiento<span className='text-red-700 font-semibold text-lg'>*</span></label>
            <input
              type="date"
              {...register('nacimiento', { required: 'La fecha es obligatoria' })}
              placeholder="dd/mm/yyyy"
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-0 focus:border-sky-500"
            />
            {errors.nacimiento && <p className="mt-1 text-xs sm:text-sm text-rose-600">{errors.nacimiento.message}</p>}
          </div>

          <div>
            <label className="mb-1.5 sm:mb-2 block text-xs sm:text-sm font-medium text-slate-700">Localidad<span className='text-red-700 font-semibold text-lg'>*</span></label>
            <input
              type="text"
              {...register('localidad', { required: 'La localidad es obligatoria' })}
              placeholder="..."
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-0 focus:border-sky-500"
            />
            {errors.localidad && <p className="mt-1 text-xs sm:text-sm text-rose-600">{errors.localidad.message}</p>}
          </div>

          {isCreate && (
            <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-3 text-xs sm:text-sm text-slate-700">
              <input type="checkbox" {...register('cumpleAsistencia')} className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500" />
              Cumple con el 80% de asistencia
            </label>
          )}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-2">
            <button
              type="button"
              onClick={() => dispatch(closeModal())}
              className="w-full sm:w-auto rounded-xl border border-slate-300 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto rounded-xl bg-sky-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white transition hover:bg-sky-700"
            >
              {isCreate ? 'Agregar alumno' : 'Guardar cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditarAlumnoModal
