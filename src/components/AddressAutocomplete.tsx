import { useEffect, useRef, React } from "react";
import { Input } from "@/components/ui/input";

export interface AddressComponents {
  street: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  countryCode: string;
}

interface Props {
  value: string;
  onChange: (value: string, components?: AddressComponents) => void;
  placeholder?: string;
  className?: string;
  countries?: string[];
}

declare global {
  interface Window {
    google: any;
    initMap?: () => void;
  }
}

export function AddressAutocomplete({
  value,
  onChange,
  placeholder = "Comece a escrever a morada...",
  className,
  countries = ["pt", "es"],
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<any>(null);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    const apiKey = 
      import.meta.env.VITE_GOOGLE_PLACES_KEY || 
      (window as any).GOOGLE_PLACES_APIKEY ||
      "AIzaSyCA8i_MD423MR9vQBRlyYk5FhEjkcWkq4w";

    if (!apiKey) return;

    const scriptId = "google-maps-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    const initAutocomplete = () => {
      if (!inputRef.current || !window.google?.maps?.places || autocompleteRef.current) return;

      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ["address"],
        componentRestrictions: { country: countries },
        fields: ["address_components", "formatted_address"],
      });

      // Disable browser native autocomplete
      inputRef.current.setAttribute("autocomplete", "off");

      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current.getPlace();
        if (!place || !place.address_components) return;

        const components: AddressComponents = {
          street: "", city: "", region: "", postalCode: "", country: "", countryCode: "",
        };

        let streetNumber = "";
        let route = "";

        place.address_components.forEach((component: any) => {
          const types = component.types;
          if (types.includes("street_number")) streetNumber = component.long_name;
          if (types.includes("route")) route = component.long_name;
          if (types.includes("locality")) components.city = component.long_name;
          if (types.includes("administrative_area_level_1")) components.region = component.long_name;
          if (types.includes("postal_code")) components.postalCode = component.long_name;
          if (types.includes("country")) {
            components.country = component.long_name;
            components.countryCode = component.short_name;
          }
        });

        components.street = `${route}${streetNumber ? ", " + streetNumber : ""}`;
        
        if (onChangeRef.current) {
          onChangeRef.current(place.formatted_address, components);
        }
      });
    };

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&language=pt`;
      script.async = true;
      script.onload = initAutocomplete;
      document.head.appendChild(script);
    } else if (window.google?.maps?.places) {
      initAutocomplete();
    } else {
      script.addEventListener("load", initAutocomplete);
    }

    return () => {
      // Don't remove script on unmount as it causes errors with the Google script
      if (script) script.removeEventListener("load", initAutocomplete);
    };
  }, [JSON.stringify(countries)]);

  // Use a local state for the input value to prevent re-renders from the parent during typing
  // This is a "controlled-to-uncontrolled" pattern to solve the focus/lag issues
  const [localValue, setLocalValue] = React.useState(value);

  // Sync external value changes (like when clicking a suggestion) back to local state
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setLocalValue(newVal);
    onChange(newVal);
  };

  return (
    <Input
      ref={inputRef}
      type="text"
      value={localValue}
      onChange={handleInputChange}
      placeholder={placeholder}
      className={className}
      autoComplete="off"
    />
  );
}