import React from 'react';

class Contenedor extends React.Component {
    

    manejadorSession(){
        let ses = localStorage.getItem("SESSION");
        return {ses}
    }
    render() {
        return(
            
            <div className="container-md-8">
                <div className="ratio ratio-16x9">
                    <iframe src="http://127.0.0.1:5501/index.html" title="" allowfullscreen></iframe>
                </div>
            </div>
            
        );
    }
}

export default Contenedor;