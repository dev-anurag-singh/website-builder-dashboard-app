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
import { upsertAgency } from '@/actions/agency';
import { Agency } from '@prisma/client';
import { v4 } from 'uuid';
import { initUser } from '@/actions/user';
import { useRouter } from 'next/navigation';
import { useToast } from '../ui/use-toast';
import { Loader2 } from 'lucide-react';

function AgencyDetails({ data }: { data?: Partial<Agency> }) {
  const form = useForm<TAgencyValidator>({
    mode: 'onChange',
    resolver: zodResolver(AgencyValidator),
    defaultValues: {
      name: data?.name || '',
      companyEmail: data?.companyEmail,
      companyPhone: data?.companyPhone || '',
      whiteLabel: data?.whiteLabel || false,
      address: data?.address || '',
      city: data?.city || '',
      zipCode: data?.zipCode || '',
      state: data?.state || '',
      country: data?.country || '',
      agencyLogo: data?.agencyLogo || '',
    },
  });
  const isLoading = form.formState.isSubmitting;
  const router = useRouter();
  const { toast } = useToast();

  async function onSubmit(values: TAgencyValidator) {
    try {
      let custId;
      const response = await upsertAgency({
        id: data?.id ? data.id : v4(),
        customerId: data?.customerId || custId || '',
        address: values.address,
        agencyLogo: values.agencyLogo,
        city: values.city,
        companyPhone: values.companyPhone,
        country: values.country,
        name: values.name,
        state: values.state,
        whiteLabel: values.whiteLabel,
        zipCode: values.zipCode,
        createdAt: new Date(),
        updatedAt: new Date(),
        companyEmail: values.companyEmail,
        connectAccountId: '',
        goal: 5,
      });
      if (data?.id) {
        return router.refresh();
      }
      const userData = await initUser({
        role: 'AGENCY_OWNER',
        agencyId: response.id,
      });
      if (!userData) throw new Error('Something went wrong');

      toast({ title: 'Agency Created' });

      router.push(`/agency/${response.id}`);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Oppse!',
        description: 'could not create your agency',
      });
    }
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
              disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
              disabled={isLoading}
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
              disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
              disabled={isLoading}
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
            <Button disabled={isLoading} type='submit'>
              {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              Save Agency Information
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default AgencyDetails;
