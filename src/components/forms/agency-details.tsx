'use client';
import { useForm } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AgencyValidator, TAgencyValidator } from '@/lib/agency-validator';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Button } from '../ui/button';
import FileUpload from '../file-upload';

function AgencyDetails() {
  const form = useForm<TAgencyValidator>({
    resolver: zodResolver(AgencyValidator),
  });

  function onSubmit(data: TAgencyValidator) {
    console.log(data);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Agency Information</CardTitle>
        <CardDescription>
          Lets create an agency for you business. You can edit agency settings
          later from the agency settings tab.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='agencyLogo'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agency Logo</FormLabel>
                  <FormControl>
                    <FileUpload
                      apiEndpoint='agencyLogo'
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex md:flex-row gap-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Agency Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Your agency name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='companyEmail'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Agency Email</FormLabel>
                    <FormControl>
                      <Input readOnly placeholder='Email' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex md:flex-row gap-4'>
              <FormField
                control={form.control}
                name='companyPhone'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Agency Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder='Phone' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='whiteLabel'
              render={({ field }) => {
                return (
                  <FormItem className='flex flex-row items-center justify-between rounded-lg border gap-4 p-4'>
                    <div>
                      <FormLabel>Whitelabel Agency</FormLabel>
                      <FormDescription>
                        Turning on whilelabel mode will show your agency logo to
                        all sub accounts by default. You can overwrite this
                        functionality through sub account settings.
                      </FormDescription>
                    </div>

                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name='address'
              render={({ field }) => (
                <FormItem className='flex-1'>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder='123 st...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex md:flex-row gap-4'>
              <FormField
                control={form.control}
                name='city'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder='City' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='state'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input placeholder='State' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='zipCode'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Zipcode</FormLabel>
                    <FormControl>
                      <Input placeholder='Zipcode' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='country'
              render={({ field }) => (
                <FormItem className='flex-1'>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder='Country' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>
              {/* {isLoading ? <Loading /> : 'Save Agency Information'} */}
              Save Agency Information
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default AgencyDetails;
