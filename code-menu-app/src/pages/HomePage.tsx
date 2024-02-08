import React from "react";
import { Link } from "react-router-dom";
import "../styles/index.sass";

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <h1>Bem-vindo ao Code Burguer</h1>
      <p>
        Descubra uma explosão de sabores em cada hambúrguer artesanal da Code
        Burguer. Com ingredientes frescos e combinações inovadoras, nossas
        receitas são feitas para encantar e satisfazer. Do suculento
        cheeseburger com molho especial à inovadora fusão de sabores, cada
        mordida é uma jornada gastronômica. Venha se deliciar e despertar sua
        paixão por hambúrgueres.
      </p>
      <div className="buttons-container">
        <Link to="/products" className="menu-link">
          Explore o Cardápio
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
