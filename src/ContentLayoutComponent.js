import * as React from "react";
import ContentLayout from "@cloudscape-design/components/content-layout";
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import Grid from "@cloudscape-design/components/grid";
import Tiles from "@cloudscape-design/components/tiles";
import Form from "@cloudscape-design/components/form";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import FormField from "@cloudscape-design/components/form-field";
import Input from "@cloudscape-design/components/input";
import Textarea from "@cloudscape-design/components/textarea";
import Select from "@cloudscape-design/components/select";
import './App.css';  // Import your CSS file

export default function ContentLayoutComponent() {
    const [value, setValue] = React.useState("gift-items");
    const [selectedOption, setSelectedOption] = React.useState({ label: "Option 1", value: "1" });
    const [name, setName] = React.useState("");
    const [surname, setSurname] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [notes, setNotes] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [errors, setErrors] = React.useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        const newErrors = {};

        if (!name) {
            newErrors.name = "Name is required";
        }
        if (!surname) {
            newErrors.surname = "Surname is required";
        }
        if (!email) {
            newErrors.email = "Email is required";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setErrors({});
            // Handle form submission logic here
            console.log('Form submitted:', {
                value,
                selectedOption,
                name,
                surname,
                email,
                address,
                notes
            });
        }
    };

    return (
        <>
            <ContentLayout
                defaultPadding
                headerBackgroundStyle="linear-gradient(135deg, rgb(71, 17, 118) 3%, rgb(131, 57, 157) 44%, rgb(149, 85, 182) 69%, rgb(145, 134, 215) 94%)"
                headerVariant="high-contrast"
                maxContentWidth={800}
                header={<Header variant="h1">Nhận quà Cloud Day 2024 </Header>}
            >
            </ContentLayout>
            <div className="grid-container">
                <Grid
                    className={window.innerWidth < 768 ? "grid-definition-mobile" : "grid-definition-desktop"}
                >
                    <div style={{ paddingTop: "50px" }}>
                        <Tiles
                            onChange={({ detail }) => setValue(detail.value)}
                            value={value}
                            columns={window.innerWidth < 768 ? 2 : 4}  // Responsive columns
                            items={[
                                {
                                    label: "Item 1",
                                    image: (
                                        <img
                                            src="/image-placeholder.png"
                                            alt="placeholder"
                                            className="tiles-item"
                                        />
                                    ),
                                    value: "gift-items"
                                },
                                {
                                    label: "Item 2",
                                    image: (
                                        <img
                                            src="/image-placeholder.png"
                                            alt="placeholder"
                                            className="tiles-item"
                                        />
                                    ),
                                    value: "item2"
                                },
                                {
                                    label: "Item 3",
                                    image: (
                                        <img
                                            src="/image-placeholder.png"
                                            alt="placeholder"
                                            className="tiles-item"
                                        />
                                    ),
                                    value: "item3"
                                },
                                {
                                    label: "Item 4",
                                    image: (
                                        <img
                                            src="/image-placeholder.png"
                                            alt="placeholder"
                                            className="tiles-item"
                                        />
                                    ),
                                    value: "item4"
                                }
                            ]}
                        />
                    </div>

                    <div>
                        <form onSubmit={handleSubmit} className="form-container">
                            <Form
                                actions={
                                    <SpaceBetween direction="horizontal" size="xs">
                                        <Button formAction="none" variant="link">
                                            Cancel
                                        </Button>
                                        <Button variant="primary" type="submit">Submit</Button>
                                    </SpaceBetween>
                                }
                            >
                                <Container
                                    header={<Header variant="h2">Form Thông tin nhận quà</Header>}
                                >
                                    <SpaceBetween direction="vertical" size="l">
                                        <FormField label="Name" errorText={errors.name}>
                                            <Input
                                                value={name}
                                                onChange={({ detail }) => setName(detail.value)}
                                                required
                                                ariaRequired
                                            />
                                        </FormField>
                                        <FormField label="Surname" errorText={errors.surname}>
                                            <Input
                                                value={surname}
                                                onChange={({ detail }) => setSurname(detail.value)}
                                                required
                                                ariaRequired
                                            />
                                        </FormField>
                                        <FormField label="Email" errorText={errors.email}>
                                            <Input
                                                value={email}
                                                type="email"
                                                onChange={({ detail }) => setEmail(detail.value)}
                                                required
                                                ariaRequired
                                            />
                                        </FormField>
                                        <FormField label="Size áo">
                                            <Select
                                                selectedOption={selectedOption}
                                                onChange={({ detail }) => setSelectedOption(detail.selectedOption)}
                                                options={[
                                                    { label: "Option 1", value: "1" },
                                                    { label: "Option 2", value: "2" },
                                                    { label: "Option 3", value: "3" },
                                                    { label: "Option 4", value: "4" },
                                                    { label: "Option 5", value: "5" }
                                                ]}
                                            />
                                        </FormField>
                                        <FormField label="Địa chỉ" errorText={errors.surname}>
                                            <Input
                                                value={address}
                                                onChange={({ detail }) => setAddress(detail.value)}
                                            />
                                        </FormField>
                                        <FormField label="Ghi chú">
                                            <Textarea
                                                value={notes}
                                                onChange={({ detail }) => setNotes(detail.value)}
                                                placeholder="Ghi chú"
                                            />
                                        </FormField>
                                    </SpaceBetween>
                                </Container>
                            </Form>
                        </form>
                    </div>
                </Grid>
            </div>
        </>
    );
}
