import { CommonModule } from '@angular/common';
import { Component,  } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


interface Grupo {
  id: number;
  nombre: string;
}

interface Alumno {
  id: number;
  nombre: string;
}
@Component({
  selector: 'app-agregar-tutor-modal',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
  templateUrl: './agregar-tutor-modal.page.html',
  styleUrls: ['./agregar-tutor-modal.page.scss'],
})
export class AgregarTutorModalPage  {
  tutorForm!: FormGroup;
  grupos: Grupo[] = [];
  alumnos: Alumno[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.tutorForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      grupoId: [null, Validators.required],
      hijos: this.fb.array([], Validators.required) // Debe seleccionar al menos 1 hijo
    });

    this.cargarGrupos();
  }

get hijosControls(): FormControl[] {
  return (this.tutorForm.get('hijos') as FormArray).controls as FormControl[];
}


  cargarGrupos() {
    // Simula carga de grupos (puedes reemplazar con llamada real)
    this.grupos = [
      { id: 1, nombre: 'Grupo A' },
      { id: 2, nombre: 'Grupo B' },
      { id: 3, nombre: 'Grupo C' },
    ];
  }

  cargarAlumnosDelGrupo() {
    const grupoId = this.tutorForm.get('grupoId')?.value;

    if (!grupoId) {
      this.alumnos = [];
      (this.tutorForm.get('hijos') as FormArray).clear();
      return;
    }

    // Simula carga alumnos según grupoId
    this.alumnos = this.obtenerAlumnosPorGrupo(grupoId);

    // Resetear el FormArray hijos
    const hijosFormArray = this.tutorForm.get('hijos') as FormArray;
    hijosFormArray.clear();

    this.alumnos.forEach(() => hijosFormArray.push(new FormControl(false)));
  }

  obtenerAlumnosPorGrupo(grupoId: number): Alumno[] {
    // Simulación simple, debes obtener datos reales desde backend
    const todosAlumnos: Alumno[] = [
      { id: 1, nombre: 'Juan Perez', },
      { id: 2, nombre: 'Ana Gómez', },
      { id: 3, nombre: 'Luis Torres', },
      { id: 4, nombre: 'Maria Lopez', },
      { id: 5, nombre: 'Carlos Ruiz', },
    ];

    // Simula filtro por grupo (esto cambia según tu lógica)
    if (grupoId === 1) return todosAlumnos.slice(0, 2);
    if (grupoId === 2) return todosAlumnos.slice(2, 4);
    if (grupoId === 3) return todosAlumnos.slice(4, 5);
    return [];
  }

  guardarTutor() {
    if (this.tutorForm.invalid) {
      this.tutorForm.markAllAsTouched();
      alert('Por favor llena correctamente todos los campos y selecciona al menos un hijo');
      return;
    }

    const formValue = this.tutorForm.value;

    // Obtener IDs de hijos seleccionados
    const hijosSeleccionados = this.alumnos
      .filter((_, i) => formValue.hijos[i])
      .map(alumno => alumno.id);

    if (hijosSeleccionados.length === 0) {
      alert('Selecciona al menos un hijo.');
      return;
    }

    // Aquí arma el objeto a guardar / enviar al backend
    const tutor = {
      nombre: formValue.nombre,
      apellido: formValue.apellido,
      correo: formValue.correo,
      telefono: formValue.telefono,
      grupoId: formValue.grupoId,
      hijos: hijosSeleccionados
    };

    console.log('Tutor a guardar:', tutor);

    alert('Tutor guardado con éxito (simulado)');
    this.tutorForm.reset();
    this.alumnos = [];
  }
  fotoPreview: string | ArrayBuffer | null = null;
fotoFile: File | null = null;

onImageSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.fotoFile = input.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.fotoPreview = reader.result;
    };
    reader.readAsDataURL(this.fotoFile);
  }
}

}
