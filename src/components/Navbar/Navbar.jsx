import React from 'react'
import {AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography} from "@material-ui/core";
import {ShoppingCart} from "@material-ui/icons";
import {Link, useLocation} from "react-router-dom"

import logo from "../../assets/Logo.jpg";

import useStyles from "./styles";

const Navbar = ({totalItems}) => {
	const location = useLocation();
	const classes = useStyles();

  return (
		<>
			<AppBar position = "fixed" className = {classes.appBar} color = "inherit">
				<Toolbar>
					<img src = {logo} alt = "Commerce.js" height = "50px" className = "classes.image" style = {{marginRight : "10px"}}/>
					<Typography component = {Link} to = "/"  variant = "h6" className = {classes.title} color = "inherit">
						Peaky Pets
					</Typography>
					<div className = {classes.grow}/>
					{location.pathname === "/"  && (
						<div className = {classes.Button}>
						<IconButton component = {Link} to = "/cart" aria-label = "Show Items In Cart" color = "inherit">
							<Badge badgeContent = {totalItems} color = "secondary">
								<ShoppingCart/>
							</Badge>
						</IconButton>						
					</div>
					)}
					
				</Toolbar>
			</AppBar>
		</>
  )
}

export default Navbar