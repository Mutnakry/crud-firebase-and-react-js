import React from 'react'

function navbar() {
    return (
        <div>
            <nav class="navbar navbar-expand-sm bg-secondary ">
                <ul class="navbar-nav text-center">
                    <li class="nav-item">
                        <a class="nav-link" href="/showing">Show image</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/img">Test</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="product">Product</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="showproduct">ShowProduct</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/">CRUD</a>
                    </li>
                </ul>
            </nav>
            <br></br>
        </div>
    )
}

export default navbar