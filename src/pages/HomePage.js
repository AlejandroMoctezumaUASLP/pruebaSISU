// React
import React, { useState, useEffect } from "react";
import { useAuth } from '../contexts/authContext'

// Modulo CSS
import styles from "./PagesStyle.module.css";

// Importaciones Prime React
import "primereact/resources/themes/rhea/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";    
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Dropdown } from 'primereact/dropdown';

/**
 * Página de inicio del sistema
 * 
 * El código se estructura de la sig. forma:
 * <ul style="list-style: none;">
 *  <li> Contexto de Autenticación
 *  <li> Estados de Página
 *  <li> Funciones de la Página
 *  <li> Hooks (Carga Inicial, Recarga, Contexto regresó algo)
 *  <li> Partes del componente
 *  <li> Componente
 * </ul>
 * @member
 */
export const HomePage = () => {
    // CONTEXTO DE AUTENTICACIÓN
    const {user, logOut} = useAuth();

    // ESTADOS DE PÁGINA
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [layout, setLayout] = useState('list');
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [sortField, setSortField] = useState(null);
    const sortOptions = [
        {label: 'Alfabeticamente', value: 'nombre'},
        {label: 'Alfabeticamente (Inverso)', value: '!nombre'},
        {label: 'Mayor a Menor', value: 'edad'},
        {label: 'Menor a Mayor', value: '!edad'},
    ];

    // FUNCIONES DE LA PÁGINA
    // Se llama al contexto para hacer LogOut del usuario
    const handleLogout = async () => {
        try {
          await logOut();
        } catch (error) {
          console.log(error);
        }
    }

    // Dependiendo de la opción seleccionada, determinara el campo a usar
    // y el orden que se usará
    const onSortChange = (event) => {
      const value = event.value;

      if (value.indexOf('!') === 0) {
          setSortOrder(-1);
          setSortField(value.substring(1, value.length));
          setSortKey(value);
      }
      else {
          setSortOrder(1);
          setSortField(value);
          setSortKey(value);
      }
    }

    // HOOKS
    // Al cargar la página, se obtiene la lista de usuarios
    useEffect(() => {
        const requestOptions = {
          method: "GET",
          redirect: "follow",
        };
    
        fetch(
          "http://localhost:8000/servicio/usuarios",
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => setListaUsuarios(result.result))
          .catch((error) => console.log("Hubo un error"));
    }, []);

    // PARTES DEL COMPONENTE
    // Item (Lista)
    const renderListItem = (data) => {
      return (
          <div className="col-12">
              <div className={`${styles.productListItem}`}>
                  <img src={data.avatar} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.nombre} />
                  <div className={`${styles.productListDetail}`}>
                      <div className={`${styles.productName}`}>{data.nombre}</div>
                      <div className={`${styles.productDescription}`}>Edad: {data.edad}</div>
                      <i className={`pi pi-tag ${styles.productCategoryIcon}`}></i><span className={`${styles.productCategory}`}>{data.ciudad.nombre}</span>
                  </div>
              </div>
          </div>
      );
    }

    // Item (Grid)
    const renderGridItem = (data) => {
      return (
          <div className="col-12 md:col-4">
              <div className={`${styles.productGridItem} card`}>
                  <div className={`${styles.productGridItemTop}`}>
                      <div>
                          <i className={`pi pi-tag ${styles.productCategoryIcon}`}></i>
                          <span className={`${styles.productCategory}`}>{data.ciudad.nombre}</span>
                      </div>
                  </div>
                  <div className={`${styles.productGridItemContent}`}>
                    <img src={data.avatar} style={{height: "200px", width: "auto"}} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.nombre} />
                    <div className={`${styles.productName}`}>{data.nombre}</div>
                    <div className={`${styles.productDescription}`}>Edad: {data.edad}</div>
                  </div>
              </div>
          </div>
      );
    }

    // Item (Se determina la opción de renderizado según "layout")
    const itemTemplate = (user, layout) => {
      if (!user) {
          return;
      }

      if (layout === 'list')
          return renderListItem(user);
      else if (layout === 'grid')
          return renderGridItem(user);
    }

    // Cabecera (Definición y se pasa como const)
    const renderHeader = () => {
      return (
          <div className="grid grid-nogutter">
              <div className="col-6" style={{textAlign: 'left'}}>
                  <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sort By Price" onChange={onSortChange}/>
              </div>
              <div className="col-6" style={{textAlign: 'right'}}>
                  <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
              </div>
          </div>
      );
    }

    const header = renderHeader();

    // COMPONENTE
    return (
        <div className={`${styles.dataviewDemo}`}>
          <div className="card">
              <DataView value={listaUsuarios} layout={layout} header={header}
                      itemTemplate={itemTemplate} paginator rows={3}
                      sortOrder={sortOrder} sortField={sortField} />
          </div>
        </div>
    )
}
