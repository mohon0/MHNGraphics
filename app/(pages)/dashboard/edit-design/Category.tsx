import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { designCategories } from '@/constant/DesignCategory';
import type { NewDesignSchemaType } from '@/lib/Schemas';

export default function Category({ category }: { category: string }) {
  const { control } = useFormContext<NewDesignSchemaType>();

  return (
    <div className='grid gap-4'>
      <FormField
        control={control}
        name='category'
        render={({ field }) => (
          <FormItem>
            <Label>Design Category</Label>
            <Select onValueChange={field.onChange} defaultValue={category}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder='Select Category' />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {designCategories.map((category) => (
                  <SelectItem
                    key={category.value}
                    value={category.value.toLowerCase().replace(/\s+/g, '_')}
                  >
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
