import React from "react";
import { TextField, IconButton, Button } from "@material-ui/core";
import { HiSearch as SearchIcon, HiUserAdd as AddCircle } from "react-icons/hi";

const createSearchBar = () => function SearchBar({ setResearch, addAction }) {
  return (
    <div className="flex flex-col sm:flex-row items-center">
      <div className="w-full sm:w-1/2 flex items-center">
        <TextField
          onChange={(e) => setResearch(e.target.value)}
          label="Pesquisar"
          variant="outlined"
          size="small"
          type="text"
          className="w-full"
        />
        <div className="w-10 ml-1">
          <IconButton variant="outlined" color="primary">
            <SearchIcon />
          </IconButton>
        </div>
      </div>
      <div className="sm:w-1/2 w-full flex justify-center sm:justify-end">
        <Button
          onClick={addAction}
          color="primary"
          variant="contained"
          startIcon={<AddCircle />}
        >
          Adicionar
        </Button>
      </div>
    </div>
  );
};

export default createSearchBar();
