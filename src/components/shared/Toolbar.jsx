"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, X } from "lucide-react";

/**
 * Toolbar compound component for search, filters and new-record button.
 *
 * Usage:
 * <Toolbar>
 *   <Toolbar.SearchInput value={search} onChange={setSearch} placeholder="..." />
 *   <Toolbar.FilterSelect value={role} onChange={setRole} placeholder="Rol" options={[...]} />
 *   <Toolbar.NewButton onClick={openCreate}>Nuevo</Toolbar.NewButton>
 * </Toolbar>
 */

export function Toolbar({ children }) {
  return (
    <div className="flex flex-wrap items-center gap-3 py-4">
      {children}
    </div>
  );
}

function SearchInput({ value, onChange, placeholder = "Buscar..." }) {
  return (
    <div className="relative flex-1 min-w-[200px] max-w-sm">
      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-9 pr-9"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

function FilterSelect({ value, onChange, placeholder, options = [] }) {
  return (
    <Select value={value || undefined} onValueChange={(v) => onChange(v === "all" ? "" : v)}>
      <SelectTrigger className="w-[160px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Todos</SelectItem>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function NewButton({ onClick, children = "Nuevo" }) {
  return (
    <Button onClick={onClick} className="ml-auto">
      <Plus className="mr-2 h-4 w-4" />
      {children}
    </Button>
  );
}

Toolbar.SearchInput = SearchInput;
Toolbar.FilterSelect = FilterSelect;
Toolbar.NewButton = NewButton;
