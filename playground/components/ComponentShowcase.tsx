import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
} from "@/components/ui";
import { Bell, Check, Mail, Settings, User, Plus, Trash2, Edit } from "lucide-react";

export function ComponentShowcase() {
  const [checked, setChecked] = useState(false);
  const [switchOn, setSwitchOn] = useState(false);

  return (
    <div className="space-y-8">
      {/* Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Buttons</CardTitle>
          <CardDescription>Ulike varianter og størrelser av knapper</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button disabled>Disabled</Button>
            <Button>
              <Mail className="mr-2 h-4 w-4" />
              Med ikon
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Form Elements */}
      <Card>
        <CardHeader>
          <CardTitle>Skjemaelementer</CardTitle>
          <CardDescription>Input, select, checkbox og andre skjemakomponenter</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">E-post</Label>
              <Input id="email" type="email" placeholder="din@epost.no" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Passord</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Melding</Label>
            <Textarea id="message" placeholder="Skriv meldingen din her..." />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Velg land</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Velg et land" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">Norge</SelectItem>
                  <SelectItem value="se">Sverige</SelectItem>
                  <SelectItem value="dk">Danmark</SelectItem>
                  <SelectItem value="fi">Finland</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={checked}
                  onCheckedChange={(c) => setChecked(c as boolean)}
                />
                <Label htmlFor="terms">Godta vilkårene</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="notifications" checked={switchOn} onCheckedChange={setSwitchOn} />
                <Label htmlFor="notifications">Aktiver varsler</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Prosjekt Alpha</CardTitle>
            <CardDescription>Siste oppdatering for 2 timer siden</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Et spennende prosjekt med moderne teknologi og innovative løsninger.
            </p>
          </CardContent>
          <CardFooter className="gap-2">
            <Button size="sm">
              <Edit className="mr-1 h-3 w-3" />
              Rediger
            </Button>
            <Button size="sm" variant="outline">
              Se mer
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistikk</CardTitle>
            <CardDescription>Denne måneden</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2,345</div>
            <p className="text-xs text-muted-foreground">+12.5% fra forrige måned</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>TR</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">Travers Team</CardTitle>
              <CardDescription>5 medlemmer</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-1">
              <Badge>Design</Badge>
              <Badge variant="secondary">Utvikling</Badge>
              <Badge variant="outline">DevOps</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Badges</CardTitle>
          <CardDescription>Små etiketter for status og kategorisering</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge>
              <Check className="mr-1 h-3 w-3" />
              Fullført
            </Badge>
            <Badge variant="secondary">
              <Bell className="mr-1 h-3 w-3" />3 nye
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Tabs</CardTitle>
          <CardDescription>Navigasjon mellom seksjoner</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="account">
                <User className="mr-2 h-4 w-4" />
                Konto
              </TabsTrigger>
              <TabsTrigger value="password">
                <Settings className="mr-2 h-4 w-4" />
                Innstillinger
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Bell className="mr-2 h-4 w-4" />
                Varsler
              </TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="mt-4 space-y-2">
              <h4 className="font-medium">Kontoinformasjon</h4>
              <p className="text-sm text-muted-foreground">
                Administrer kontoinformasjonen din her.
              </p>
            </TabsContent>
            <TabsContent value="password" className="mt-4 space-y-2">
              <h4 className="font-medium">Innstillinger</h4>
              <p className="text-sm text-muted-foreground">
                Konfigurer applikasjonsinnstillinger og preferanser.
              </p>
            </TabsContent>
            <TabsContent value="notifications" className="mt-4 space-y-2">
              <h4 className="font-medium">Varselinnstillinger</h4>
              <p className="text-sm text-muted-foreground">
                Velg hvilke varsler du vil motta.
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Accordion */}
      <Card>
        <CardHeader>
          <CardTitle>Accordion</CardTitle>
          <CardDescription>Utvidbare seksjoner for FAQ og lignende</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Hva er Travers UI?</AccordionTrigger>
              <AccordionContent>
                Travers UI er et tilpasset komponentbibliotek basert på shadcn/ui, designet for å
                gi en konsistent og profesjonell brukeropplevelse på tvers av prosjekter.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Hvordan bruker jeg temaet?</AccordionTrigger>
              <AccordionContent>
                Bruk dashboard til å tilpasse fargene, og eksporter deretter CSS-variablene til din
                globals.css fil. Alle komponenter vil automatisk bruke de nye fargene.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Kan jeg legge til flere komponenter?</AccordionTrigger>
              <AccordionContent>
                Ja! Du kan bruke shadcn CLI (npx shadcn@latest add) for å legge til flere
                komponenter, eller lage dine egne basert på samme mønster.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Dialog */}
      <Card>
        <CardHeader>
          <CardTitle>Dialog / Modal</CardTitle>
          <CardDescription>Modale vinduer for viktige handlinger</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Åpne dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Er du sikker?</DialogTitle>
                <DialogDescription>
                  Denne handlingen kan ikke angres. Dette vil permanent slette kontoen din og fjerne
                  dataene fra serverne våre.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline">Avbryt</Button>
                <Button variant="destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Slett
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Opprett ny</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Opprett nytt prosjekt</DialogTitle>
                <DialogDescription>
                  Fyll inn detaljene for det nye prosjektet ditt.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Prosjektnavn</Label>
                  <Input id="name" placeholder="Mitt prosjekt" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Beskrivelse</Label>
                  <Textarea id="description" placeholder="Beskriv prosjektet..." />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Avbryt</Button>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Opprett
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* Avatar */}
      <Card>
        <CardHeader>
          <CardTitle>Avatar</CardTitle>
          <CardDescription>Brukerbilder og initialer</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Avatar className="h-8 w-8">
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <Avatar className="h-10 w-10">
              <AvatarFallback>CD</AvatarFallback>
            </Avatar>
            <Avatar className="h-12 w-12">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>EF</AvatarFallback>
            </Avatar>
            <Avatar className="h-14 w-14">
              <AvatarFallback>GH</AvatarFallback>
            </Avatar>
            <Separator orientation="vertical" className="h-14" />
            <div className="flex -space-x-3">
              <Avatar className="h-10 w-10 border-2 border-background">
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <Avatar className="h-10 w-10 border-2 border-background">
                <AvatarFallback>B</AvatarFallback>
              </Avatar>
              <Avatar className="h-10 w-10 border-2 border-background">
                <AvatarFallback>C</AvatarFallback>
              </Avatar>
              <Avatar className="h-10 w-10 border-2 border-background">
                <AvatarFallback>+3</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
