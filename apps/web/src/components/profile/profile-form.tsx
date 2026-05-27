'use client';

import {
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import {
  useEffect,
} from 'react';

import {
  Controller,
  useForm,
} from 'react-hook-form';

import { SmartDatePicker } from '@/components/shared/smart-date-picker';

import { enqueueSnackbar } from 'notistack';

import { useUpdateProfile } from '@/hooks/use-update-profile';

export function ProfileForm({
  profile,
}: {
  profile: any;
}) {
  const {
    register,

    handleSubmit,

    watch,

    reset,

    control,
  } = useForm();

  const relationshipStatus =
    watch(
      'relationshipStatus',
    );

  const updateMutation =
    useUpdateProfile();

  useEffect(() => {
    if (profile) {
      reset(profile);
    }
  }, [profile, reset]);

  async function onSubmit(
    data: any,
  ) {
    try {
      const payload = {
  name: data.name,
  phone: data.phone,
  department:
    data.department,
  designation:
    data.designation,
  birthday:
    data.birthday,
  relationshipStatus:
    data.relationshipStatus,
  marriageDate:
    data.marriageDate,
  fatherName:
    data.fatherName,
  motherName:
    data.motherName,
  spouseName:
    data.spouseName,
  emergencyContact:
    data.emergencyContact,
  childrenCount:
    data.childrenCount,
  joiningDate:
    data.joiningDate,
  whatsappNumber:
    data.whatsappNumber,
};

await updateMutation.mutateAsync({
  id: profile.id,
  ...payload,
});

      enqueueSnackbar(
        'Profile updated successfully',
        {
          variant: 'success',
        },
      );
    } catch (error) {
      enqueueSnackbar(
        'Failed to update profile',
        {
          variant: 'error',
        },
      );

      console.error(error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(
        onSubmit,
      )}
    >
      <Stack spacing={4}>
        <Card>
          <CardContent>
            <Stack spacing={3}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700 }}
              >
                Basic Information
              </Typography>

              <Grid
                container
                spacing={2}
              >
                <Grid size={{
                  xs: 12,
                  md: 6,
                }}>
                  <TextField
                    label="Name"
                    {...register(
                      'name',
                    )}
                    fullWidth
                  />
                </Grid>

                <Grid size={{
                  xs: 12,
                  md: 6,
                }}>
                  <TextField
                    label="Phone"
                    {...register(
                      'phone',
                    )}
                    fullWidth
                  />
                </Grid>

                <Grid size={{
                  xs: 12,
                  md: 6,
                }}>
                  <TextField
                    label="Department"
                    {...register(
                      'department',
                    )}
                    fullWidth
                  />
                </Grid>

                <Grid size={{
                  xs: 12,
                  md: 6,
                }}>
                  <TextField
                    label="Designation"
                    {...register(
                      'designation',
                    )}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Stack spacing={3}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700 }}
              >
                Personal Information
              </Typography>

              <Grid
                container
                spacing={2}
              >
                <Grid size={{
                  xs: 12,
                  md: 6,
                }}>
                  <Controller
                    name="birthday"
                    control={control}
                    render={({ field }) => (
                      <SmartDatePicker
                        label="Birthday"
                        value={field.value}
                        onChange={field.onChange}
                        fullWidth
                      />
                    )}
                  />
                </Grid>

                <Grid size={{
                  xs: 12,
                  md: 6,
                }}>
                  <TextField
                    select
                    label="Relationship Status"
                    defaultValue=""
                    {...register(
                      'relationshipStatus',
                    )}
                    fullWidth
                  >
                    <MenuItem value="SINGLE">
                      Single
                    </MenuItem>

                    <MenuItem value="MARRIED">
                      Married
                    </MenuItem>
                    <MenuItem value="DIVORCED">
                      Divorced
                    </MenuItem>
                  </TextField>
                </Grid>

                {relationshipStatus ===
                  'MARRIED' && (
                  <Grid size={{
                    xs: 12,
                    md: 6,
                  }}>
                    <Controller
                      name="marriageDate"
                      control={control}
                      render={({ field }) => (
                        <SmartDatePicker
                          label="Marriage Date"
                          value={field.value}
                          onChange={field.onChange}
                          fullWidth
                        />
                      )}
                    />
                  </Grid>
                )}

                <Grid size={{
                  xs: 12,
                  md: 6,
                }}>
                  <TextField
                    label="Father Name"
                    {...register(
                      'fatherName',
                    )}
                    fullWidth
                  />
                </Grid>

                <Grid size={{
                  xs: 12,
                  md: 6,
                }}>
                  <TextField
                    label="Mother Name"
                    {...register(
                      'motherName',
                    )}
                    fullWidth
                  />
                </Grid>

                {relationshipStatus ===
                  'MARRIED' && (
                  <Grid size={{
                    xs: 12,
                    md: 6,
                  }}>
                    <TextField
                      label="Spouse Name"
                      {...register(
                        'spouseName',
                      )}
                      fullWidth
                    />
                  </Grid>
                )}

                <Grid size={{
                  xs: 12,
                  md: 6,
                }}>
                  <TextField
                    label="Emergency Contact"
                    {...register(
                      'emergencyContact',
                    )}
                    fullWidth
                  />
                </Grid>

                <Grid size={{
                  xs: 12,
                  md: 6,
                }}>
                  <TextField
                    type="number"
                    label="Children Count"
                    {...register(
                      'childrenCount',
                    )}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Stack spacing={3}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700 }}
              >
                Work Information
              </Typography>

              <Grid
                container
                spacing={2}
              >
                <Grid size={{
                  xs: 12,
                  md: 6,
                }}>
                  <Controller
                    name="joiningDate"
                    control={control}
                    render={({ field }) => (
                      <SmartDatePicker
                        label="Joining Date"
                        value={field.value}
                        onChange={field.onChange}
                        fullWidth
                      />
                    )}
                  />
                </Grid>

                <Grid size={{
                  xs: 12,
                  md: 6,
                }}>
                  <TextField
                    label="WhatsApp Number"
                    {...register(
                      'whatsappNumber',
                    )}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Stack>
          </CardContent>
        </Card>

        <Button
          type="submit"
          variant="contained"
          size="large"
        >
          Save Profile
        </Button>
      </Stack>
    </form>
  );
}