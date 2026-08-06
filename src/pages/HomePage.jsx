import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Ingresa un correo válido'),
})

function HomePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data) => {
    console.log('Formulario enviado:', data)
    alert(`Hola ${data.name}, tu formulario quedó listo.`)
  }

  return (
    <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">Inicio</p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Panel base para roles de director y administrador.
        </h1>
        <p className="max-w-2xl text-lg text-slate-600">
          Desde aquí puedes entrar a la vista del director o al panel del administrador para ver las pantallas propuestas.
        </p>

        <div className="flex flex-wrap gap-3">
          <a href="/director/dashboard" className="rounded-xl bg-sky-600 px-4 py-2 font-semibold text-white transition hover:bg-sky-700">
            Ver director
          </a>
          <a href="/admin/dashboard" className="rounded-xl bg-violet-600 px-4 py-2 font-semibold text-white transition hover:bg-violet-700">
            Ver administrador
          </a>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h2 className="text-xl font-semibold text-slate-900">Formulario de ejemplo</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Nombre</label>
            <input
              {...register('name')}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-0 focus:border-sky-500"
              placeholder="Tu nombre"
            />
            {errors.name && <p className="mt-1 text-sm text-rose-600">{errors.name.message}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Correo</label>
            <input
              {...register('email')}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-0 focus:border-sky-500"
              placeholder="tu@email.com"
            />
            {errors.email && <p className="mt-1 text-sm text-rose-600">{errors.email.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-sky-600 px-4 py-2.5 font-semibold text-white transition hover:bg-sky-700"
          >
            Enviar
          </button>
        </div>
      </form>
    </section>
  )
}

export default HomePage
