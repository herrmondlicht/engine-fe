import React from "react";
import SearchIcon from "@heroicons/react/solid/SearchIcon";
import AddCircle from "@heroicons/react/solid/UserAddIcon";
import { Input, Button, BUTTON_VARIANTS } from "ui-fragments";

const createSearchBar = () =>
  function SearchBar({ setResearch, addAction }) {
    return (
      <div className="flex flex-col sm:flex-row items-end gap-8">
        <div className="w-full sm:w-1/2 flex items-end">
          <div className="w-full">
            <Input
              onChange={e => setResearch(e.target.value)}
              label="Pesquisar"
              size="small"
              type="text"
              fw
            />
          </div>
          <Button variant={BUTTON_VARIANTS.GHOST}>
            <SearchIcon className="text-primary-0 w-7 h-7" />
          </Button>
        </div>
        <div className="sm:w-1/2 w-full flex sm:justify-end items-end">
          <Button onClick={addAction}>
            <div className="flex gap-3">
              <AddCircle className="text-white w-5 h-5" />
              Adicionar
            </div>
          </Button>
        </div>
      </div>
    );
  };

export default createSearchBar();
