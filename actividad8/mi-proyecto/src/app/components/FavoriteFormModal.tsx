//Es un componente cliente
"use client";

import React from 'react';
import Modal from 'react-modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAddFavorite } from '../hooks/useFavorites';

//1.Definir esquema de val con yup
const FavoriteSchema = Yup.object().shape({
  customName: Yup.string()
    .min(3, "Min3 caracteres")
    .max(30, "Max 30 caracteres")
    .required("Nombre es obligatorio"),
  
  description: Yup.string()
    .min(5, "Min 5 caracteres")
    .max(150, "Max 150 caracteres")
    .required("Descripción es obligatoria"),
});

//def tipos dato
interface PokemonData{
  name: string;
  url: string;
}

//interfaz para los props 
interface FavoriteFormModalProps {
    isOpen: boolean; // El estado de apertura/cierre
    pokemonData: PokemonData; // Los datos del Pokemon
    closeModal: () => void; // func que no devuelve nada
}


//2Definir el tipo de los valores del formulario -> tipo d dato que va a recibir el compoente
interface FavoriteFormValues{
    customName: string;
    description: string;
}

// va a recibir props
export default function FavoriteFormModal({ 
  isOpen, pokemonData, closeModal}: FavoriteFormModalProps) {
    const addMutation = useAddFavorite();

    //3. valores iniciales 
    const initialValues: FavoriteFormValues = {
        customName: pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1), // nombre original
        description: '',
    };

    // 4 func que se ejecuta al enviar
    const handleSubmit = async ( 
        values: FavoriteFormValues, 
        { setSubmitting, resetForm }: any
    ) => {

        //datos q se envian al useMutatuon 
        const favoritePayload = {
            id: pokemonData.name, // El slug/ID del Pokémon
            name: pokemonData.name, // Nombre original
            customName: values.customName,
            description: values.description,
        };

        try {
            await addMutation.mutateAsync(favoritePayload); // mutateAsync espera a que la mutacion termine antes de cerrar el modal
            alert(`¡${values.customName} agregado a favss!!!!!`);
            closeModal();
            resetForm(); // Limpiar el formulario desp del exito
        } catch (error){
            alert(`Error al guardar: ${error}`); // si hay error de api o hook
        }finally {
        setSubmitting(false); // Desactiva el estado de "enviando"
        }
    };
    ///
    return (
    <Modal 
      isOpen={isOpen} onRequestClose={closeModal} ariaHideApp={false} 
      style={{
        content: {
          top: '50%', left: '50%', right: 'auto', bottom: 'auto',
          marginRight: '-50%', transform: 'translate(-50%, -50%)',
          maxWidth: '450px', width: '90%', padding: '30px'
        }
      }}
    >
      <h3>Añadir a Favoritos: {pokemonData.name.toUpperCase()}</h3>
      
      <Formik
        initialValues={initialValues}
        validationSchema={FavoriteSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            
            {/* Campo Nombre Personalizado */}
            <div>
              <label htmlFor="customName">Nombre Personalizado</label>
              <Field type="text" id="customName" name="customName" />
              <ErrorMessage name="customName" >
                { (msg) => 
                  <div style={{ color: 'red', fontSize: '0.9em' }} > 
                    {msg}
                  </div>
                }
              </ErrorMessage>
            </div>

            {/* Campo Descripción */}
            <div>
              <label htmlFor="description">Descripción</label>
              {/* Usamos 'as="textarea"' para hacer un campo de texto multi-línea */}
              <Field as="textarea" id="description" name="description" rows="3" />
              <ErrorMessage name="description">
                {(msg) => (
                  <div style={{ color: 'red', fontSize: '0.9em' }}>
                    {msg}
                  </div>
                )}
              </ErrorMessage>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '15px' }}>
              <button 
                type="button" 
                onClick={closeModal}
                disabled={isSubmitting}
              >
                Cancelar
              </button>
              
              <button 
                type="submit" 
                // Requisito: Usar dirty y isValid para deshabilitar el submit
                disabled={isSubmitting || !isValid || !dirty} 
                style={{ 
                    backgroundColor: (isValid && dirty) ? '#34609eff' : '#ccc', 
                    color: 'white', 
                    cursor: (isValid && dirty) ? 'pointer' : 'not-allowed' 
                }}
              >
                {isSubmitting ? "Guardando..." : "Guardar Favorito"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      
    </Modal>
  );
} 