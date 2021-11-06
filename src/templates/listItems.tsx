/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { css, jsx, useTheme } from "@emotion/react";
import { createTheme } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import {Link} from 'react-router-dom';

const mdTheme = createTheme();

const styledlink = css`
  text-decoration: none;
  color: ${mdTheme.palette.text.secondary};
`;

export function MainListItems() {
  return (
    <div>
      <Link to="/" css={styledlink}>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon/>
          </ListItemIcon>
          <ListItemText primary="Home"/>
        </ListItem>
      </Link>
      <Link to="/txversionchart" css={styledlink}>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon/>
          </ListItemIcon>
          <ListItemText primary="Products" css={styledlink} />
        </ListItem>
      </Link>
    </div>
  );
};

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Sub reports</ListSubheader>
  </div>
);
