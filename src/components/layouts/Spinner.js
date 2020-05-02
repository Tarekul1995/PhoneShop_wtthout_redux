import React from 'react'

function Spinner() {
    return (
        <div style={{ position:'absolute', top:'45%',left:"45%" }}>
            <div className="spinner-border text-success" role="status" style={{ width:'4rem', height:'4rem' }}>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}

export default Spinner;