import { Header } from "@/components"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input";
import ReactSelect from 'react-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { hardCodedRsCities } from "../CreateShelter/hardcodedCities";


interface IThoroughfaresTypes {
  id?: string
  label: string
  value: string
}

const thoroughfaresTypes: IThoroughfaresTypes[] = [
  { id: '1', label: 'Rua', value: 'Rua' },
  { id: '2', label: 'Avenida', value: 'Avenida' },
  { id: '3', label: 'Travessa', value: 'Travessa' },
  { id: '4', label: 'Praça', value: 'Praça' },
  { id: '5', label: 'Rodovia', value: 'Rodovia' },
  { id: '6', label: 'Alameda', value: 'Alameda' },
  { id: '7', label: 'Largo', value: 'Largo' },
  { id: '8', label: 'Estrada', value: 'Estrada' },
];

interface ICategory {
  id?: string
  label: string
  value: CategoriesEnum
}

enum CategoriesEnum {
  Shelter = 'Shelter',
  PetShelter = 'PetShelter',
  SortingCenter = 'SortingCenter',
  DonationCollectionCenter = 'DonationCollectionCenter',
  DistributionCenter = 'DistributionCenter',
  Kitchen = 'Kitchen'
}

const categories: ICategory[] = [
  { id: '1', label: 'Abrigo', value: CategoriesEnum.Shelter },
  { id: '2', label: 'Abrigo de Pets', value: CategoriesEnum.PetShelter },
  { id: '3', label: 'Centro de Triagem', value: CategoriesEnum.SortingCenter },
  { id: '4', label: 'Centro de Coleta de Doações', value: CategoriesEnum.DonationCollectionCenter },
  { id: '5', label: 'Centro de Distribuição', value: CategoriesEnum.DistributionCenter },
  { id: '6', label: 'Cozinha', value: CategoriesEnum.Kitchen }
];

const createInstitutionFormSchema = z.object({
  category: z
    .array(z.enum([
      CategoriesEnum.Shelter,
      CategoriesEnum.PetShelter,
      CategoriesEnum.SortingCenter,
      CategoriesEnum.DonationCollectionCenter,
      CategoriesEnum.DistributionCenter,
      CategoriesEnum.Kitchen
    ]))
    .min(1, "Selecione pelo menos um tipo")
    .default([CategoriesEnum.Shelter]),
  name: z
    .string({
      required_error: "O nome da instituição é obrigatório.",
    })
    .min(2, {
      message: "O nome da instituição deve ter pelo menos 2 caracteres.",
    }),
  thoroughfareType: z
    .string({
      required_error: "O tipo de logradouro é obrigatório.",
    }),
  thoroughfare: z
    .string({
      required_error: "O logradouro é obrigatório.",
    }),
  number: z
    .string().optional(),
  neighborhood: z
    .string().optional(),
  city: z
    .string({
      required_error: "A cidade é obrigatória.",
    }),
})

type CreateInstitutionFormValues = z.infer<typeof createInstitutionFormSchema>

const defaultValues: Partial<CreateInstitutionFormValues> = {
  category: [CategoriesEnum.Shelter],
  name: "",
  thoroughfareType: "",
  thoroughfare: "",
  number: "",
  neighborhood: "",
  city: ""
}

const CreateInstitution = () => {
  const navigate = useNavigate();

  const form = useForm<CreateInstitutionFormValues>({
    resolver: zodResolver(createInstitutionFormSchema),
    defaultValues,
  })

  function onSubmit(data: any) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }


  return (
    <div className="flex flex-col h-screen items-center">
      <Header
        title="Cadastrar Instituição"
        className="bg-white [&_*]:text-zinc-800 border-b-[1px] border-b-border"
        startAdornment={
          <Button
            variant="ghost"
            className="[&_svg]:stroke-blue-500"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={20} />
          </Button>
        }
      />

      <div className="p-4 flex flex-col max-w-6xl w-full gap-3  h-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <h6 className="text-2xl font-semibold">Cadastrar Instituição</h6>

            <div className="flex flex-col gap-y-2 w-full">
              <p className="font-semibold text-muted-foreground w-full">
                Identificação
              </p>
              <div
                className="bg-muted rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 w-full md:flex-row items-center md:justify-between gap-y-6 md:gap-y-0 md:gap-x-6"
              >
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full">
                      <FormLabel className="text-muted-foreground">
                        Tipo da instituição
                      </FormLabel>
                      <FormControl>
                        <ReactSelect
                          className="w-full"
                          placeholder="Selecione o tipo de instituição"
                          isMulti
                          options={categories.map((category) => ({
                            value: category.value,
                            label: category.label,
                          }))}
                          defaultValue={categories.filter(category =>
                            field.value.includes(category.value)
                          )}
                          onChange={(selectedOptions) => {
                            field.onChange(selectedOptions.map(option => option.value));
                          }}
                        />
                      </FormControl>
                      <FormDescription className="text-slate-400">
                        Você pode selecionar mais de um tipo
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel
                        className="text-muted-foreground"
                      >
                        Nome da instuição
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Insira o nome da instituição"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription
                        className="text-slate-400"
                      >
                        Insira a forma como a instituição é mais conhecida
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex flex-col gap-y-2 w-full">
              <p className="font-semibold text-muted-foreground w-full">
                Endereço
              </p>
              <div
                className="bg-muted rounded-lg w-full p-6 
                grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6"
              >
                <FormField
                  control={form.control}
                  name="thoroughfareType"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel
                        className="text-muted-foreground"
                      >
                        Tipo do logradouro
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo do logradouro" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {thoroughfaresTypes.map((thoroughfaresType) => (
                            <SelectItem
                              key={thoroughfaresType.id}
                              value={thoroughfaresType.value}
                            >
                              {thoroughfaresType.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription
                        className="text-slate-400"
                      >
                        Ex.: Avenida, Rua
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="thoroughfare"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel
                        className="text-muted-foreground"
                      >
                        Logradouro
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Insira o logradouro"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription
                        className="text-slate-400"
                      >
                        Digite apenas o logradouro. Ex.: Ipiranga
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="number"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel
                        className="text-muted-foreground"
                      >
                        Número
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Insira o número do logradouro"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription
                        className="text-slate-400"
                      >
                        Insira o número e complemento, se houver
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="neighborhood"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel
                        className="text-muted-foreground"
                      >
                        Bairro
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Insira o o bairro"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription
                        className="text-slate-400"
                      >
                      </FormDescription>
                      {' '}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="neighborhood"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel
                        className="text-muted-foreground"
                      >
                        Bairro
                      </FormLabel>
                      <FormControl>
                        <ReactSelect
                          name="city"
                          placeholder="Cidade"
                          options={hardCodedRsCities.map((city) => ({
                            value: city,
                            label: city,
                          }))}
                          defaultValue={hardCodedRsCities.filter((city) =>
                            field.value && field.value.includes(city)
                          ).map((city) => ({
                            value: city,
                            label: city,
                          }))}
                          onChange={(selectedOptions) => {
                            if (selectedOptions) {
                              const selectedValues = Array.isArray(selectedOptions)
                                ? selectedOptions.map((option) => option.value)
                                : [selectedOptions.value];
                              field.onChange(selectedValues);
                            }
                          }}
                        />
                      </FormControl>
                      <FormDescription
                        className="text-slate-400"
                      >
                      </FormDescription>
                      {' '}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export { CreateInstitution }